const defaultExtractorConfig = {
  name: 'undefined',
  type: 'gql',
  save: ['payload'],
  variables: [{}],
  queries: [],
  // dataQueries: [],
  payload: {
    directory: '.',
    filename: 'file.json'
  }
}

export { defaultExtractorConfig }
