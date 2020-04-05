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
  payload: _payload.payload // callbacks

};

var assignDataFile = function assignDataFile(dataFileSrc) {
  var ret = Object.assign({}, defaultDataFile, dataFileSrc);
  var newPayload = Object.assign({}, _payload.payload, dataFileSrc.payload);
  var newCallbacks = Object.assign({}, _callbacks.callbacks, dataFileSrc.callbacks);
  console.log("callbacks: " + JSON.stringify(_callbacks.callbacks, null, 2));
  console.log("newCallbacks" + JSON.stringify(newCallbacks, null, 2));
  ret.callbacks = newCallbacks;
  ret.payload = newPayload;
  return ret;
};

exports.assignDataFile = assignDataFile;