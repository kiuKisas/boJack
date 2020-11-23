import BoJack from '../lib/index'

const api = {
  url: 'https://pokeapi.co/api/v2/'
}

const config = {
  baseQueriesPath: 'test/src/queries',
  basePayloadPath: 'test/payloads',
  baseAssetsPath: 'test/assets'
}

const fileDataSrcs = [
  {
    name: 'Pokemon Rest',
    type: 'get',
    stringQueries: [],
    arrayVariables: [{id: 1, url: 'pokemon-species/1'}, {id: 2, url: 'pokemon-species/2'}],
    payload: {
      filename: 'pokerest-',
      callbacks: {
        name: (payload, variables) => {
          return payload.filename + variables.id + payload.extension
        }
      }
    }
  }
]

describe('TEST REST PokeApi', function () {
  const bo = new BoJack(api, config)
  const test = bo.start(fileDataSrcs).then(yo => {
    it('should yoyo', function () {
      return true
    })
  })
})
