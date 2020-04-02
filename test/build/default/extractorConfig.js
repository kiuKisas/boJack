"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultExtractorConfig = void 0;
var defaultExtractorConfig = {
  name: 'undefined',
  save: ['payload'],
  variables: [{}],
  queries: [],
  // dataQueries: [],
  payload: {
    directory: '.',
    filename: 'file.json'
  }
};
exports.defaultExtractorConfig = defaultExtractorConfig;