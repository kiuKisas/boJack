"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boExtractHelpers = void 0;

var _path = _interopRequireDefault(require("path"));

var _printers = require("../../../utils/printers.js");

var _mode = require("../modes/mode.js");

var _files = require("../../../utils/files.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var boExtractHelpers = {
  readQuery: function readQuery(pathBaseQueries, queryPath) {
    var filepath = _path["default"].join(pathBaseQueries, queryPath);

    _printers.boPrinters.info("reading ".concat(filepath));

    return _files.boFiles.read(filepath);
  },
  readAllQueries: function readAllQueries(pathBaseQueries, queries) {
    return Promise.all(queries.map(function (queryPath) {
      return boExtractHelpers.readQuery(pathBaseQueries, queryPath);
    }));
  },
  saveFiles: function saveFiles(name, dataFile, pathBases, data) {
    return Promise.all(dataFile.save.map(function (mode) {
      return _mode.boExtractModes.call(mode).then(function (modeCallback) {
        return modeCallback(name, dataFile, pathBases, JSON.stringify(data));
      });
    }));
  }
};
exports.boExtractHelpers = boExtractHelpers;