"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BoJack = void 0;

var _helpers = require("./utils/helpers.js");

var _config = require("./default/config.js");

var _Extractor = require("./lib/Extractor/Extractor.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// TODO: should even not be a class, let's see how things going on..
var BoJack = /*#__PURE__*/function () {
  function BoJack(api) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, BoJack);

    this.config = Object.assign(_config.defaultConfig, config);
    this.extractor = new _Extractor.Extractor(api);
  } // TODO: shall we delete it ?


  _createClass(BoJack, [{
    key: "updateConfig",
    value: function updateConfig(config) {
      this.opts = Object.assign(this.opts, config);
    }
  }, {
    key: "start",
    value: function start(dataFiles) {
      var _this = this;

      return _helpers.boHelpers.arrayValidator(dataFiles).then(function (datas) {
        var config = _helpers.boHelpers.parsePathBases(_this.config);

        return _this.extractor.launch(datas, config);
      });
      dist;
    }
  }, {
    key: "execute",
    value: function execute(dataFile) {
      return new Promise(function (resolve, reject) {
        resolve(dataFile);
      });
    }
  }]);

  return BoJack;
}();

exports.BoJack = BoJack;