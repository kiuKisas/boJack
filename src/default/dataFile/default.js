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
  payload
  // callbacks
}

const assignDataFile = dataFileSrc => {
  const ret = Object.assign({}, defaultDataFile, dataFileSrc)
  const newPayload = Object.assign({}, payload, dataFileSrc.payload)
  const newCallbacks = Object.assign({}, callbacks, dataFileSrc.callbacks)
  console.log("callbacks: " + JSON.stringify(callbacks, null, 2))
  console.log("newCallbacks" + JSON.stringify(newCallbacks, null, 2))
  ret.callbacks = newCallbacks
  ret.payload = newPayload
  return ret
}

export { assignDataFile }
