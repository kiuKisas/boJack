import { boPrinters } from '../../../utils/printers.js'

const boCallbacks = {
  execQueries: (data, callbacks) => {
    return new Promise((resolve, reject) => {
      const queriesKeys = Object.keys(data)
      const cbQueriesKeys = Object.keys(callbacks.byQueries)
      const newData = data
      queriesKeys.forEach(queryKey => {
        if (callbacks && cbQueriesKeys.includes(queryKey)) {
          boPrinters.info(`Callback query call for ${queryKey}`)
          newData[queryKey] = callbacks.byQueries[queryKey](newData[queryKey])
        }
      })
      // TODO: Handling error
      resolve(newData)
    }).catch(e => { boPrinters.error('truc ', e) })
  }
}

export { boCallbacks }
