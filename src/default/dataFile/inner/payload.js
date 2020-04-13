const payload = {
  directory: '.',
  filename: 'file',
  save: true,
  extension: '.json',
  // One variables, one file
  eachVariables: true,
  nameCallback: (payload, data, variables = {}) => {
   return payload.filename + data.id + payload.extension
  }
}

export { payload }
