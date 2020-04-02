import path from 'path'
import { boFiles } from '../../../utils/files.js'

// should return a Promise
const callbackModes = {
  payload: (name, dataFile, pathBases, data) => {
    const payloadPath = path.join(
      pathBases.payload,
      dataFile.payload.directory,
      name
    )
    return boFiles.write(payloadPath, data)
  },
  assets: data => {
    return new Promise((resolve, reject) => {
      return data
    })
  }
}

const modes = Object.keys(callbackModes)

const boExtractModes = {
  call: mode => {
    return new Promise((resolve, reject) => {
      if (!modes.includes(mode)) reject(`${mode} mode doesn't exist`)
      resolve(callbackModes[mode])
    })
  }
}

export { boExtractModes }
