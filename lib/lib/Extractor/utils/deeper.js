import { boExtractHelpers } from './helpers'

import 'regenerator-runtime/runtime'
// Deeper
// Recursively going into object to parse things and call appropriates callbacks by keys
//

// NB: typeof Array will return object, so we have to check for array first..
const recDeeper = async (callbacks, data) => {
  if (data === null || data === undefined) {
    return data
  } else if (Array.isArray(data)) {
    const dataMap = data.map(async d => {
      return await recDeeper(callbacks, d)
    })
    return Promise.all(dataMap)
  } else if (typeof data === 'object') {
    return await boExtractHelpers.callbacksByKeysEnsure(data, callbacks, recDeeper.bind(undefined, callbacks))
  }
  return data
}

export { recDeeper }

// TODO: Ideas for later
// - [] let user define action by type
