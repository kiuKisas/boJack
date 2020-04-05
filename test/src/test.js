/////////////////////////////////////////////////////////////
// DISCLAIMER: This is just a simple test, not a unit test //
/////////////////////////////////////////////////////////////
import { BoJack } from "./index";

const pokeApi = {
  url: "https://graphql-pokemon.now.sh/"
};

const catalysishubApi = {
  url: "http://api.catalysis-hub.org/graphql"
};

const config = {
  baseQueriesPath: "test/src/queries",
  basePayloadPath: "test/payloads",
  baseAssetsPath: "test/assets"
};
// TODO: Constructor become ApiHelper
// Functionnal, Go !
//
const boPokemon = new BoJack(pokeApi, config);

console.log("New Bojack");

// --> Extractor :: Save one file from queries + callbacks
// --> File oriented
//
// [ FileDataSrc ]
// content all data for one File
//

const arrayVariables = [{ name: "pikachu" }, { name: "mewtwo" }];

//
// Test :: 
// - [x] one stringQueries with one variables
// - [x] one stringQueries, multiples variables, dynamic filename

const fileDataSrcs = [
  {
    name: "sixPokemons",
    stringQueries: "pokemons.gql",
    arrayVariables: [{ first: 6 }]
  },
  {
    name: "Pikachu & Mewtwo",
    stringQueries: ["pokemon.gql"],
    arrayVariables,
    payload: {
      filename: 'pokemon-',
      nameCallback: (payload, data) => {
        return payload.filename + data.pokemon.number + payload.extension;
      }
    }
  }
];


const test = boPokemon.start(fileDataSrcs);


//
// Test ::
// - [ ] two stringQueries, no variables, one global callbacks

const pokeDataSrcs = [
  {
    name: "Merge Mew && 9 firsts pokemons && Global callback:: Merge pokemons in one array",
    stringQueries: ["starters.gql", "mew.gql"],
    payload: {
      filename: 'startersAndMew'
    },
    callbacks: {
      global: (data => {
        console.log('GLOBAAALL--------------------------')
        const ret = Object.assign({}, data)
        ret.pokemons.push(data.pokemon)
        delete ret.pokemon
        console.log(ret)
        return ret
      })
    }
  }
]

const test2 = boPokemon.start(pokeDataSrcs)
