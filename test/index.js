import BoJack from '../lib/index'

const pokeApi = {
  url: 'https://graphql-pokemon.now.sh/'
}

const config = {
  baseQueriesPath: 'test/src/queries',
  basePayloadPath: 'test/payloads',
  baseAssetsPath: 'test/assets'
}

const arrayVariables = [{ name: 'pikachu' }, { name: 'mewtwo' }]

const fileDataSrcs = [
  {
    name: 'sixPokemons',
    stringQueries: 'pokemons.gql',
    arrayVariables: [{ first: 6 }]
  },
  {
    name: 'Pikachu & Mewtwo',
    stringQueries: ['pokemon.gql'],
    arrayVariables,
    payload: {
      filename: 'pokemon-',
      nameCallback: (payload, data) => {
        return payload.filename + data.pokemon.number + payload.extension
      }
    }
  }
]

const globalData = {
  name: 'Pikachu & Mewtwo',
  stringQueries: ['pokemon.gql'],
  arrayVariables,
  payload: {
    filename: 'pokeglobal',
    save: ['all'],
  }
}
const pokeDataSrcs = [
  {
    name: 'Merge Mew && 9 firsts pokemons',
    stringQueries: ['starters.gql', 'mew.gql'],
    payload: {
      filename: 'startersAndMew'
    }
  }
]

const pokeDdataSrc = {
  name: 'Merge Mew && 9 firsts pokemons',
  stringQueries: ['starters.gql', 'mew.gql'],
  payload: {
    filename: 'startersAndMew2'
  },
  callbacks: {
    global: data => {
      const ret = Object.assign({}, data)
      ret.pokemons.push(data.pokemon)
      delete ret.pokemon
      return ret
    }
  }
}

describe('Test with Pokemon API', function () {
  const boPoke = new BoJack(pokeApi, config)
  describe('6 first pokemons, pikachu and mewtwo', function () {
    const test = boPoke.start(fileDataSrcs)
    it('should save 3 files', function () {
      return true
    })
  })
  describe('9 firsts pokemons and Mew', function () {
    const test = boPoke.start(pokeDataSrcs)
    it('should save 1 file', function () {
      return true
    })
  })
  describe('Merge 9 firsts pokemons and Mew', function () {
    const test = boPoke.start(pokeDdataSrc)
    it('should save one file', function () {
      return true
    })
  })
  describe('One file', function () {
    const test = boPoke.start(globalData)
    it('should save one file', function () {
      return true
    })
  })
})
