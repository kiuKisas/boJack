"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boHelpers = void 0;

var _path = _interopRequireDefault(require("path"));

var _printers = require("./printers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var boHelpers = {
  // Path Helpers
  parsePathBases: function parsePathBases(config) {
    return {
      queries: _path["default"].join(config.rootPath, config.baseQueriesPath),
      payload: _path["default"].join(config.rootPath, config.basePayloadPath),
      assets: _path["default"].join(config.rootPath, config.baseAssetsPath)
    };
  },
  // Validator helpers
  arrayValidator: function arrayValidator(elems) {
    var emptyness = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return new Promise(function (resolve, reject) {
      if (!emptyness && !elems) {
        var err = "can't be undefined";

        _printers.boPrinters.error('type error :: ', err);
      }

      var elemsArray = Array.isArray(elems) ? elems : [elems];
      resolve(elemsArray);
    });
  }
};
exports.boHelpers = boHelpers;