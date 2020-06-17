import { GraphQLClient } from 'graphql-request'

function headers(key) {
  return {
    headers: {
      Authorization: 'Bearer ' + key
    }
  }
}

function newClient(url, key) {
  const opts = key ? headers(key) : {}
  return new GraphQLClient(url, opts)
}

export { newClient }
