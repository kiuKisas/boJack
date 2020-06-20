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

// TODO: decide if promise or not ?
function makeCallback(config, pathBase) {
  const fileExtensions = Object.keys(config.extensions)
  const filePaths = {}
  fileExtensions.forEach(fileExtension => {
    filePaths[fileExtension] = path.join(pathBase, config.extensions[fileExtension].path)
  })
  const parsePath = config.keepPath ? deleteDomain : getFileName
  const preventDownload = config.forceDownload
    ? () => {
        return false
      }
    : fs.existsSync
  const newValue = config.replaceUrl
    ? (_, path) => {
        return path
      }
    : url => {
        return url
      }

  // TODO: should be a promise
  return async url => {
    const ext = url.split('.').pop()
    if (!fileExtensions.includes(ext)) return false
    const assetPath = path.join(filePaths[ext], parsePath(url))
    if (preventDownload(assetPath)) return false
    const minifier = getMinify(ext)
    // bad boy, let's ignore it for now
    await download(url)
      .then(data => {
        minifier(data).then(miniData => {
          boFiles.write(assetPath, miniData)
        }).catch(e => {
          throw e
        })
      })
      .catch(e => {
        throw e
      })
    // minify && callbacks
    return newValue(url, assetPath)
  }
}

const getAssetCallback = (config, pathBase) => {
  if (!config.download) return {}
  const ret = {}
  ret[config.key] = makeCallback(config, pathBase)
  return ret
}

export { getAssetCallback }
