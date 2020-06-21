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
  saveFile(data, dataPayload, pathBase, variables = {}) {
    // Your callback, your responsability
    const filename = dataPayload.nameCallback(dataPayload, variables, data)
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
    console.log(dataCallbacked)
    return Object.assign({}, data, dataCallbacked)
  },

  arraysToObj(dataArrays) {
    // Ensure that we don't delete data with the same key
    // TODO: more elegant way
    const keys = { all: [], matched: [] }
    const ret = {}

    dataArrays.forEach(data => {
      const objKeys = Object.keys(data)
      const matchKeys = keys.all.filter(key => {
        return objKeys.includes(key)
      })
      if (matchKeys.length === 0) {
        keys.all.push(...objKeys)
        Object.assign(ret, data)
      } else {
        matchKeys.forEach(key => {
          if (keys.matched.includes(key)) {
            ret[key].push(data[key])
          } else {
            keys.matched.push(key)
            ret[key] = [ret[key], data[key]]
          }
        })
        const newKeys = objKeys.filter(key => {
          return matchKeys.indexOf(key) < 0
        })
        keys.all.push(...newKeys)
        Object.assign(
          ret,
          ...newKeys.map(key => {
            return data[key]
          })
        )
      }
    })
    return ret
  }
}

export { boExtractHelpers }
