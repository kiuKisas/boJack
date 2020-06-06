import { boExtractHelpers } from './helpers'

// Deeper
// Recursively going into object to parse things and call appropriates callbacks by keys
//

// NB: typeof Array will return object, so we have to check for array first..
const recDeeper = (callbacks, data) => {
  if (data === null || data === undefined) {
    return data
  } else if (Array.isArray(data)) {
    return data.map(d => {
      return recDeeper(callbacks, d)
    })
  } else if (typeof data === 'object') {
    return boExtractHelpers.callbacksByKeysEnsure(data, callbacks, recDeeper.bind(undefined, callbacks))
  }
  return data
}

export { recDeeper }

// TODO: Ideas for later
// - [] let user define action by type
