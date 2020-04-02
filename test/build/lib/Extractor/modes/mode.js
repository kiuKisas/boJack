"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boExtractModes = void 0;

var _path = _interopRequireDefault(require("path"));

var _files = require("../../../utils/files.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// should return a Promise
var callbackModes = {
  payload: function payload(name, dataFile, pathBases, data) {
    var payloadPath = _path["default"].join(pathBases.payload, dataFile.payload.directory, name);

    return _files.boFiles.write(payloadPath, data);
  },
  assets: function assets(data) {
    return new Promise(function (resolve, reject) {
      return data;
    });
  }
};
var modes = Object.keys(callbackModes);
var boExtractModes = {
  call: function call(mode) {
    return new Promise(function (resolve, reject) {
      if (!modes.includes(mode)) reject("".concat(mode, " mode doesn't exist"));
      resolve(callbackModes[mode]);
    });
  }
};
exports.boExtractModes = boExtractModes;