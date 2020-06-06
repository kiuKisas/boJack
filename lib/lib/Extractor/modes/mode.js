import path from 'path'
import { boFiles } from '../../../utils/files.js'

  // TODO: delete but keep the logic for payload type && source type
//  saveFiles: (name, outputConfig, pathBases, data) => {
//    return Promise.all(
//      outputConfig.save.map(mode => {
//        return boExtractModes.call(mode).then(modeCallback => {
//          return modeCallback(name, outputConfig, pathBases, JSON.stringify(data));
//        });
//      })
//    );
//  },
//
// should return a Promise
const callbackModes = {
  payload: (name, outputConfig, pathBases, data) => {
    const payloadPath = path.join(
      pathBases.payload,
      outputConfig.payload.directory,
      name
    )
    return boFiles.write(payloadPath, data)
  },
  assets: data => {
    return new Promise((resolve) => {
      resolve(data)
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
