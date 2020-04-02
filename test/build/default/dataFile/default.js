"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignDataFile = void 0;

var _payload = require("./inner/payload");

var _callbacks = require("./inner/callbacks");

// DataFile
// -------
//
// Content all data and options for one payload file
//
var defaultDataFile = {
  name: 'undefined',
  save: ['payload'],
  stringQueries: [],
  arrayVariables: [{}],
  payload: _payload.payload,
  callbacks: _callbacks.callbacks
};

var assignDataFile = function assignDataFile(dataFileSrc) {
  var ret = Object.assign({}, defaultDataFile, dataFileSrc);
  var newPayload = Object.assign({}, _payload.payload, dataFileSrc.payload);
  var newCallbacks = Object.assign({}, _callbacks.callbacks, dataFileSrc.callbacks);
  ret.payload = newPayload;
  ret.newCallbacks = newCallbacks;
  return ret;
};

exports.assignDataFile = assignDataFile;