/////////////////////////////////////////////////////////////
// DISCLAIMER: This is just a simple test, not a unit test //
/////////////////////////////////////////////////////////////
import { BoJack } from './index'

const api = {
  url: 'https://graphql-pokemon.now.sh/?'
}

const config = {
  baseQueriesPath: 'test/src/queries',
  basePayloadPath: 'test/payloads',
  baseAssetsPath: 'test/assets',
}
// TODO: Constructor become ApiHelper
// Functionnal, Go !
//
const bj = new BoJack(api, config)

console.log('New Bojack')

// --> Extractor :: Save one file from queries + callbacks
// --> File oriented
//
// [ FileDataSrc ]
// content all data for one File
//

const fileDataSrcs = [
  {
    name: 'Piachu',
    stringQueries: [
      'pikachu.gql'
    ]
  }
]
const test = bj.start(fileDataSrcs)
