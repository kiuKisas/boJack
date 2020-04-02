"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boCallbacks = void 0;

var _printers = require("../../../utils/printers.js");

var boCallbacks = {
  execQueries: function execQueries(data, callbacks) {
    return new Promise(function (resolve, reject) {
      var queriesKeys = Object.keys(data);
      var cbQueriesKeys = Object.keys(callbacks.byQueries);
      var newData = data;
      queriesKeys.forEach(function (queryKey) {
        if (callbacks && cbQueriesKeys.includes(queryKey)) {
          _printers.boPrinters.info("Callback query call for ".concat(queryKey));

          newData[queryKey] = callbacks.byQueries[queryKey](newData[queryKey]);
        }
      }); // TODO: Handling error

      resolve(newData);
    })["catch"](function (e) {
      _printers.boPrinters.error('truc ', e);
    });
  }
};
exports.boCallbacks = boCallbacks;