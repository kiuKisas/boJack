"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Extractor = void 0;

var _default = require("../../utils/clients/default.js");

var _printers = require("../../utils/printers");

var _default2 = require("../../default/dataFile/default");

var _helpers = require("./utils/helpers");

var _callbacks = require("./callbacks/callbacks.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Extractor = /*#__PURE__*/function () {
  function Extractor(api) {
    _classCallCheck(this, Extractor);

    this.client = (0, _default.newClient)(api.url, api.key);
  }

  _createClass(Extractor, [{
    key: "launch",
    value: function launch() {
      var _this = this;

      var dataFiles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
      var pathBases = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var count = 0;
        var total = dataFiles.length;

        _printers.boPrinters.info("".concat(count, " / ").concat(total));

        return Promise.all(dataFiles.map(function (dataFile) {
          _printers.boPrinters.info("downloading ".concat(dataFile.name));

          return _this.download(dataFile, pathBases);
        })).then(function (body) {
          _printers.boPrinters.success('Extractor :: DONE');

          resolve(body);
        })["catch"](function (e) {
          _printers.boPrinters.error("Extractor ::  ".concat(count, " / ").concat(total), e);

          reject(e);
        });
      });
    } // read files Queries and merge it after stringQueries

  }, {
    key: "allQueries",
    value: function allQueries(pathBasesQueries, stringQueries, filesQueries) {
      var queryPromises = dataFile.stringQueries.map(function (stringQuery) {
        return _helpers.boExtractHelpers.readQuery(pathBases.queries, stringQuery);
      }); // is it working ?

      return Promise.all(queryPromises).then(function (newQueries) {
        return Array.concat(stringQueries, newQueries);
      });
    }
  }, {
    key: "download",
    value: function download(dataFileSrc, pathBases) {
      var _this2 = this;

      var dataFile = (0, _default2.assignDataFile)(dataFileSrc);
      return allQueries(pathBases.queries, [], dataFile.stringQueries).then(function (queries) {
        var promisesByVariables = dataFile.arrayVariables.map(function (variables) {
          // see to make it functionnal
          return _this2.client.request(query, variables).then(resul); // fetch Query
          // apply callback by queries
          // apply assets callbacks / inner callbacks
        }); // Ici, on a par query ready

        return Promise.all(promisesByVariables);
      })["catch"](function (e) {
        _printers.boPrinters.error(e);
      });
    }
  }, {
    key: "ttdownload",
    value: function ttdownload(dataFileSrc, pathBases) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var dataFile = (0, _default2.assignDataFile)(dataFileSrc);
        var callbacks = dataFile.callbacks;
        return _helpers.boExtractHelpers.readAllQueries(pathBases.queries, dataFile.stringQueries).then(function (queries) {
          return Promise.all(dataFile.arrayVariables.map(function (variables) {
            return Promise.all(queries.map(function (query) {
              return _this3.client.request(query, variables);
            })).then(function (arrayDatas) {
              // TODO: more flexible naming
              var name = variables.locale ? variables.locale + dataFile.payload.filename : dataFile.payload.filename;
              var data = Object.assign.apply(Object, [{}].concat(_toConsumableArray(arrayDatas)));

              _callbacks.boCallbacks.execQueries(data, callbacks).then(function (newData) {
                var finalData = dataFile.callbacks.global(newData);

                _helpers.boExtractHelpers.saveFiles(name, dataFile, pathBases, finalData).then(function (res) {
                  resolve(finalData);
                })["catch"](function (e) {
                  reject(e);
                });
              });
            });
          }));
        });
      });
    }
  }]);

  return Extractor;
}();

exports.Extractor = Extractor;