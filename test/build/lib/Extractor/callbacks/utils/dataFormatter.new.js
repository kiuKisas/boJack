"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// Data Formatter
// Format data and call apropriate parser conditionnaly
var baseUrl = 'https://www.datocms-assets.com';
var imagePath = '/image/dato';
var jsPath = '/js'; // Parser
// { condition, action } --> both methods taking data to parse
//

function arrayParsing(data) {
  return data.map(function (elem) {
    return dataFormatter(elem);
  });
}

function objectParsing(data) {
  var ret = {}; // TODO: Refacto, same models as parsers
  // condition by keys ?

  if (data.url) {
    data = urlParsing(data);
  } // should always going back through it


  for (var key in data) {
    ret[key] = dataFormatter(data[key], key);
  }

  return ret;
} // here, we're sure that data is an object and data.url exist


function urlParsing(data) {
  // TODO: Refacto, same as
  var url = '';

  if (data.format && data.format === 'js') {
    url = data.url.replace(baseUrl, jsPath);
  } else {
    url = data.url.replace(baseUrl, imagePath);
  }

  return Object.assign(data, {
    url: url
  });
} // key should not be undefined
// Action according to key, dynamic


function stringParsing(data, key) {
  if (!key || !data) return '';
  return data; // TODO: Refacto I guess to a more generic way
} //  Parsers
// :: Array of parsers
//
//


var parsers = [{
  cond: function cond(data) {
    return Array.isArray(data);
  },
  action: arrayParsing
}, {
  cond: function cond(data) {
    return _typeof(data) === 'object';
  },
  action: objectParsing
}, {
  cond: function cond(data) {
    return typeof data === 'string';
  },
  action: stringParsing
}]; // TODO: Make an objet with state for each ref

function dataFormatter(data) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
  // TODO: refacto with proper methods
  return parsers.forEach(function (parser) {
    if (parser.cond(data)) return parser.parse(data, key);
  });
}