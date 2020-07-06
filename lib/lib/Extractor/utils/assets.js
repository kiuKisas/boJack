import path from 'path'
import fs from 'fs'
import download from 'download'
import { boFiles } from '../../../utils/files.js'
import { getMinify } from './minify'

function getFileName(url) {
  return url.split('/').pop()
}

function deleteDomain(url) {
  return url.split('://').pop().split('/').slice(1).join('/')
}

////////////////////
//  EXTENSION     //
//                //
////////////////////

function makeExtensionCallback(name, config) {
  const actions = []
  if (config.callback !== undefined && config.callback !== null)
    actions.push(data => {
      return config.callback(data, getMinify(name))
    })
  if (config.minify)
    actions.push(data => {
      return getMinify(name)(data)
    })

  return async data => {
    // Sequential resolve Promise with return value
    return actions.reduce((prevPromise, promise) => {
      return prevPromise
        .then(newData => {
          return promise(newData)
        })
        .catch(e => {
          return Promise.reject(e)
        })
    }, Promise.resolve(data))
  }
}

function makeExtensionConfig(config, pathBase) {
  const fileExtensions = Object.keys(config.extensions)
  const extConf = {}
  fileExtensions.forEach(fileExtension => {
    extConf[fileExtension] = {
      path: path.join(pathBase, config.extensions[fileExtension].path),
      callback: makeExtensionCallback(fileExtensions, config.extensions[fileExtension])
    }
  })
  return extConf
}

////////////////////
//  SAVE          //
//                //
////////////////////
//
function makeSaveFileCallback(saveOptions) {
  const getFilePath = saveOptions.keepUrlPath ? deleteDomain : getFileName
  const preventDownload = saveOptions.forceDownload
    ? () => {
        return false
      }
    : fs.existsSync
  return async (url, data, directoryPath) => {
    const filePath = path.join(directoryPath, getFilePath(url))
    const returnValue = saveOptions.replaceUrl ? filePath : url
    if (preventDownload(filePath)) return Promise.resolve(returnValue)
    return boFiles.write(filePath, data).then(() => {
      return Promise.resolve(returnValue)
    })
  }
}

function makeSaveCallback(saveOptions) {
  if (saveOptions === undefined || saveOptions === null || saveOptions === false) {
    return url => {
      Promise.resolve(url)
    }
  }
  const saveCallbacks = []
  if (!(saveOptions.file === undefined || saveOptions.file === false)) {
    saveCallbacks.push(makeSaveFileCallback(saveOptions.file))
  }
  if (saveOptions.payload === true) {
    saveCallbacks.push((_, data) => {
      return Promise.resolve(data)
    })
  }
  return async (url, data, directoryPath) => {
    return saveCallbacks.reduce((prevPromise, promise) => {
      return prevPromise
        .then(() => {
          return promise(url, data, directoryPath)
        })
        .catch(e => {
          return Promise.reject(e)
        })
    }, Promise.resolve(url))
  }
}

////////////////////
//                //
//    WORK        //
//                //
////////////////////

function makeCallback(extensionConfig, saveCallback) {
  return async url => {
    const ext = url.split('.').pop()
    const extConf = extensionConfig[ext]
    if (!extConf) return Promise.resolve(url)
    const t = download(url).then(data => {
      return extConf.callback(data).then(finalData => {
        return saveCallback(url, finalData, extConf.path)
      })
    })
    return t
  }
}

const getAssetCallback = (config, pathBase) => {
  if (config === undefined || config === null || !config.download) return {}
  const ret = {}
  const extensionsConfig = makeExtensionConfig(config, pathBase)
  const saveCallback = makeSaveCallback(config.save)
  ret[config.key] = makeCallback(extensionsConfig, saveCallback)
  return ret
}

export { getAssetCallback }
