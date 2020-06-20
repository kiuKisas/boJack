// outputConfig
// -------
//
// Content all data and options for one payload file
//

import { payload } from './inner/payload'
import { assignCallbacks } from './inner/callbacks'
import { assets } from './inner/assets'

const defaultOutputConfig = {
  name: 'undefined',
  // Queries to Fetch
  stringQueries: [],
  merge: true,
  // Variables for each queries
  arrayVariables: [{}]
  // payload,
  // assets,
  // callbacks,
}

const assignOutputConfig = outputConfigSrc => {
  const newPayload = Object.assign({}, payload, outputConfigSrc.payload)
  const newCallbacks = assignCallbacks(outputConfigSrc.callbacks)
  const newAssets = Object.assign({}, assets ,outputConfigSrc.assets)
  return Object.assign({}, defaultOutputConfig, outputConfigSrc, {
    callbacks: newCallbacks,
    payload: newPayload,
    assets: newAssets
  })
}

export { assignOutputConfig }
