// DataFile
// -------
//
// Content all data and options for one payload file
//

import { payload } from './inner/payload'
import { callbacks } from './inner/callbacks'

const defaultDataFile = {
  name: 'undefined',
  save: ['payload'],
  stringQueries: [],
  arrayVariables: [{}],
  payload,
  callbacks
}

const assignDataFile = dataFileSrc => {
  const ret = Object.assign({}, defaultDataFile, dataFileSrc)
  const newPayload = Object.assign({}, payload, dataFileSrc.payload)
  const newCallbacks = Object.assign({}, callbacks, dataFileSrc.callbacks)

  ret.payload = newPayload
  ret.newCallbacks = newCallbacks
  return ret
}

export { assignDataFile }
