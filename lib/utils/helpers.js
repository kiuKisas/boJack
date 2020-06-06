import path from 'path'
import { boPrinters } from './printers.js'

const boHelpers = {
  parsePathBases(config) {
    return {
      queries: path.join(config.rootPath, config.baseQueriesPath),
      payload: path.join(config.rootPath, config.basePayloadPath),
      assets: path.join(config.rootPath, config.baseAssetsPath)
    }
  },
  arrayValidator(elems, emptyness = false) {
    return new Promise((resolve, reject) => {
      if (!emptyness && !elems) {
        const err = `can't be undefined`
        boPrinters.error('type error :: ', err)
        reject(err)
      }
      const elemsArray = Array.isArray(elems) ? elems : [elems]
      resolve(elemsArray)
    })
  }
}

export { boHelpers }
