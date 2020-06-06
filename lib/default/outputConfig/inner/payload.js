const payload = {
  directory: '.',
  filename: 'file',
  save: true,
  extension: '.json',
  // One variables, one file
  eachVariables: true,
  nameCallback: (payload, data, variables = {}) => {
    const id = data.id || ''
    return payload.filename + id + payload.extension
  }
}

export { payload }
