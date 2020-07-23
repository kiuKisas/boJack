const defaultPayload = {
  directory: '.',
  filename: 'file',
  // TODO: refacto variables and all save in the same time
  save: ['variables'], // ['variables', 'all']
  format: 'json', //
  extension: '.json', // will be depreciated for farmat
  // TODO: refacto to string & callbacks for name and directory
  callbacks: {
    name: (payload, variables, data) => {
      const id = variables.id || data.id || ''
      return payload.filename + id + payload.extension
    },
    directory: (payload, variables, data) => {
      return payload.directory
    },
    // TODO: manage split for "all" save option
    // TODO: split: { variables: cb, all: cb }
    // split :: (variables, data) => { return [{variables, data}, ...] }
  }
}

const assignPayload = (payload = {}) => {
  const callbacks = Object.assign({}, defaultPayload.callbacks, payload.callbacks)
  const newPayload = Object.assign({}, defaultPayload, payload)
  newPayload.callbacks = callbacks
  return newPayload
}

export { assignPayload }
