const payload = {
  directory: '.',
  filename: 'file',
  save: ['variables'], // ['variables', 'all']
  extension: '.json',
  // One variables, one file
  eachVariables: true,
  nameCallback: (payload, variables, data) => {
    const id = variables.id || data.id || ''
    return payload.filename + id + payload.extension
  }
}

export { payload }
