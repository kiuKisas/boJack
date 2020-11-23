import BoJack from '../lib/index'

const spacexAPI = {
  url: 'https://api.spacex.land/graphql/'
}

const config = {
  baseQueriesPath: 'test/src/queries',
  basePayloadPath: 'test/payloads',
  baseAssetsPath: 'test/assets'
}

const dataSrc = {
  name: 'spaceX with assets',
  stringQueries: ['spaceX.gql'],
  payload: {
    filename: 'spaceX'
  },
  assets: {
    key: 'image',
    download: true,
    save: {
      file: {
        keepUrlPath: true,
        replaceUrl: true,
        replaceCallback: async data => { return 'test/' + data }
      }
    }
  }
}

//describe('Test with SpaceX API', function () {
//  const boSpace = new BoJack(spacexAPI, config)
//  describe('spaceX payload + assets', function () {
//    const test = boSpace.start(dataSrc).then(dataSrc => { console.log(dataSrc) })
//    it('should save 1 payload and 3 images', function () {
//      return true
//    })
//  })
//})
