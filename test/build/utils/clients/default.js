"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newClient = newClient;

var _graphqlRequest = require("graphql-request");

function newClient(url, key) {
  return new _graphqlRequest.GraphQLClient(url, {
    headers: {
      Authorization: 'Bearer ' + key
    }
  });
}