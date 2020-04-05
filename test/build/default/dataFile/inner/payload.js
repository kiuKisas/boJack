"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.payload = void 0;
var payload = {
  directory: '.',
  filename: 'file',
  extension: '.json',
  nameCallback: function nameCallback(payload, data) {
    var variables = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return payload.filename + data.id + payload.extension;
  }
};
exports.payload = payload;