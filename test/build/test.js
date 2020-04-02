"use strict";

var _index = require("./index");

/////////////////////////////////////////////////////////////
// DISCLAIMER: This is just a simple test, not a unit test //
/////////////////////////////////////////////////////////////
var api = {
  url: 'https://graphql-pokemon.now.sh/?'
};
var config = {
  baseQueriesPath: 'test/src/queries',
  basePayloadPath: 'test/payloads',
  baseAssetsPath: 'test/assets'
}; // TODO: Constructor become ApiHelper
// Functionnal, Go !
//

var bj = new _index.BoJack(api, config);
console.log('New Bojack'); // --> Extractor :: Save one file from queries + callbacks
// --> File oriented
//
// [ FileDataSrc ]
// content all data for one File
//

var fileDataSrcs = [{
  name: 'Piachu',
  stringQueries: ['pikachu.gql']
}];
var test = bj.start(fileDataSrcs);