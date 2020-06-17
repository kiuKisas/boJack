import path from 'path'

import { boPrinters } from '../../../utils/printers.js'
import { boHelpers } from '../../../utils/helpers.js'
import { boFiles } from '../../../utils/files.js'

const boExtractHelpers = {
  readQuery(pathBaseQueries, queryPath) {
    const filepath = path.join(pathBaseQueries, queryPath)
    boPrinters.info(`reading ${filepath}`)
    return boFiles.read(filepath)
  },
  saveFile(data, dataPayload, pathBase) {
    // Your callback, your responsability
    const filename = dataPayload.nameCallback(dataPayload, data)
    const payloadPath = path.join(pathBase, dataPayload.directory, filename)
    return boFiles.write(payloadPath, JSON.stringify(data))
  },
  async allQueries(pathBasesQueries, stringQueries, filesQueries) {
    return boHelpers.arrayValidator(filesQueries).then(async validatedQueries => {
      const queriesPromises = validatedQueries.map(stringQuery => {
        return boExtractHelpers.readQuery(pathBasesQueries, stringQuery)
      })
      return Promise.all(queriesPromises).then(newQueries => {
        return stringQueries.concat(newQueries)
      })
    })
  },
  callbackByKey(key, data, callbacks = {}, cbKeys = []) {
    if (cbKeys.includes(key)) {
      return callbacks[key](data)
    } else return data
  },
  callbacksByKeys(data, callbacks = {}) {
    // Your callbacks is your responsability.
    const keys = Object.keys(data)
    const cbKeys = Object.keys(callbacks)
    const dataCallbacked = {}
    keys.forEach(key => {
      if (cbKeys.includes(key)) {
        dataCallbacked[key] = callbacks[key](data[key])
      }
    })
    // /!\ Board effect, if we need a clean data, don't hesitate to use:
    // return Object.assign({}, data, dataCallbacked)
    return Object.assign(data, dataCallbacked)
  },
  callbacksEveryKeys(data, callbacks = {}, defaultCallback) {
    // Your callbacks is your responsability.
    const keys = Object.keys(data)
    const cbKeys = Object.keys(callbacks)
    const dataCallbacked = {}
    keys.forEach(key => {
      const cb = cbKeys.includes(key) ? callbacks[key] : defaultCallback
      dataCallbacked[key] = cb(data[key])
    })
    // /!\ Same Board effect
    return Object.assign(data, dataCallbacked)
  },
  callbacksByKeysEnsure(data, callbacks, ensureCallback) {
    // Your callbacks is your responsability.
    const keys = Object.keys(data)
    const cbKeys = Object.keys(callbacks)
    const dataCallbacked = {}
    keys.forEach(key => {
      if (cbKeys.includes(key)) {
        const value = callbacks[key](data[key])
        dataCallbacked[key] = value
      } else {
        dataCallbacked[key] = ensureCallback(data[key])
      }
    })
    return Object.assign({}, data, dataCallbacked)
  }
}

export { boExtractHelpers }
