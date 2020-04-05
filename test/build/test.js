"use strict";

var _index = require("./index");

/////////////////////////////////////////////////////////////
// DISCLAIMER: This is just a simple test, not a unit test //
/////////////////////////////////////////////////////////////
var pokeApi = {
  url: "https://graphql-pokemon.now.sh/"
};
var catalysishubApi = {
  url: "http://api.catalysis-hub.org/graphql"
};
var config = {
  baseQueriesPath: "test/src/queries",
  basePayloadPath: "test/payloads",
  baseAssetsPath: "test/assets"
}; // TODO: Constructor become ApiHelper
// Functionnal, Go !
//

var boPokemon = new _index.BoJack(pokeApi, config);
console.log("New Bojack"); // --> Extractor :: Save one file from queries + callbacks
// --> File oriented
//
// [ FileDataSrc ]
// content all data for one File
//

var arrayVariables = [{
  name: "pikachu"
}, {
  name: "mewtwo"
}]; //
// Test :: 
// - [x] one stringQueries with one variables
// - [x] one stringQueries, multiples variables, dynamic filename

var fileDataSrcs = [{
  name: "sixPokemons",
  stringQueries: "pokemons.gql",
  arrayVariables: [{
    first: 6
  }]
}, {
  name: "Pikachu & Mewtwo",
  stringQueries: ["pokemon.gql"],
  arrayVariables: arrayVariables,
  payload: {
    filename: 'pokemon-',
    nameCallback: function nameCallback(payload, data) {
      return payload.filename + data.pokemon.number + payload.extension;
    }
  }
}];
var test = boPokemon.start(fileDataSrcs); //
// Test ::
// - [ ] two stringQueries, no variables, one global callbacks

var pokeDataSrcs = [{
  name: "Merge Mew && 9 firsts pokemons && Global callback:: Merge pokemons in one array",
  stringQueries: ["starters.gql", "mew.gql"],
  payload: {
    filename: 'startersAndMew'
  },
  callbacks: {
    global: function global(data) {
      console.log('GLOBAAALL--------------------------');
      var ret = Object.assign({}, data);
      ret.pokemons.push(data.pokemon);
      delete ret.pokemon;
      console.log(ret);
      return ret;
    }
  }
}];
var test2 = boPokemon.start(pokeDataSrcs);