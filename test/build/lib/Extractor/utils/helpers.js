"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boExtractHelpers = void 0;

var _path = _interopRequireDefault(require("path"));

var _printers = require("../../../utils/printers.js");

var _helpers = require("../../../utils/helpers.js");

var _mode = require("../modes/mode.js");

var _files = require("../../../utils/files.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var boExtractHelpers = {
  readQuery: function readQuery(pathBaseQueries, queryPath) {
    var filepath = _path["default"].join(pathBaseQueries, queryPath);

    _printers.boPrinters.info("reading ".concat(filepath));

    return _files.boFiles.read(filepath);
  },
  //TODO: delete
  readAllQueries: function readAllQueries(pathBaseQueries, queries) {
    return Promise.all(queries.map(function (queryPath) {
      return boExtractHelpers.readQuery(pathBaseQueries, queryPath);
    }));
  },
  // TODO: delete but keyy the logic for payload type && source type
  saveFiles: function saveFiles(name, dataFile, pathBases, data) {
    return Promise.all(dataFile.save.map(function (mode) {
      return _mode.boExtractModes.call(mode).then(function (modeCallback) {
        return modeCallback(name, dataFile, pathBases, JSON.stringify(data));
      });
    }));
  },
  saveFile: function saveFile(data, dataPayload, pathBase) {
    // Your callback, your responsability
    var filename = dataPayload.nameCallback(dataPayload, data);

    var payloadPath = _path["default"].join(pathBase, dataPayload.directory, filename);

    return _files.boFiles.write(payloadPath, JSON.stringify(data));
  },
  allQueries: function allQueries(pathBasesQueries, stringQueries, filesQueries) {
    return _helpers.boHelpers.arrayValidator(filesQueries).then(function (validatedQueries) {
      var queriesPromises = validatedQueries.map(function (stringQuery) {
        return boExtractHelpers.readQuery(pathBasesQueries, stringQuery);
      });
      return Promise.all(queriesPromises).then(function (newQueries) {
        return stringQueries.concat(newQueries);
      });
    });
  },
  callbacksByKeys: function callbacksByKeys(data, callbacks) {
    // Your callbacks is your responsability.
    console.log(callbacks);
    var keys = Object.keys(data);
    var cbKeys = Object.keys(callbacks);
    var dataCallbacked = {};
    keys.forEach(function (key) {
      if (cbKeys.includes(key)) {
        dataCallbacked[key] = callbacks[key](data[key]);
      }
    }); // Board effect, if we need a clean dataQuery, don't hesitate to use:
    // return Object.assign({}, data, dataCallbacked)
    // Cheers :)

    return Object.assign(data, dataCallbacked);
  }
};
exports.boExtractHelpers = boExtractHelpers;