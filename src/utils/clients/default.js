import { GraphQLClient } from 'graphql-request'

function newClient(url, key) {
  return new GraphQLClient(url, {
    headers: {
      Authorization: 'Bearer ' + key
    }
  })
}

export { newClient }
