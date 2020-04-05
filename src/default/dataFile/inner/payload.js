const payload = {
  directory: '.',
  filename: 'file',
  extension: '.json',
  nameCallback: (payload, data, variables = {}) => {
   return payload.filename + data.id + payload.extension
  }
}

export { payload }
