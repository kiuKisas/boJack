const defaultPayload = {
  directory: '.',
  filename: 'file',
  save: ['variables'], // ['variables', 'all']
  format: 'json', //
  extension: '.json', // will be depreciated for farmat
  // TODO: refacto to { calbacks: { name, directory} }
  callbacks: {
    name: (payload, variables, data) => {
      const id = variables.id || data.id || ''
      return payload.filename + id + payload.extension
    },
    directory: (payload, variables, data) => {
      return payload.directory
    }
  }
}

const assignPayload = (payload = {}) => {
  const callbacks = Object.assign({}, defaultPayload.callbacks, payload.callbacks)
  const newPayload = Object.assign({}, defaultPayload, payload)
  newPayload.callbacks = callbacks
  return newPayload
}

export { assignPayload }
