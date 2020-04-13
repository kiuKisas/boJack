import path from 'path'
import { boFiles } from '../../../utils/files.js'

  // TODO: delete but keyy the logic for payload type && source type
//  saveFiles: (name, dataFile, pathBases, data) => {
//    return Promise.all(
//      dataFile.save.map(mode => {
//        return boExtractModes.call(mode).then(modeCallback => {
//          return modeCallback(name, dataFile, pathBases, JSON.stringify(data));
//        });
//      })
//    );
//  },
//
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
