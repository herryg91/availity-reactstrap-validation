'use strict';

exports.__esModule = true;
exports.inputTypeOverride = exports.inputType = exports.isoDateFormat = undefined;
exports.isEmpty = isEmpty;
exports.isDecimal = isDecimal;

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global document */
var isoDateFormat = exports.isoDateFormat = 'YYYY-MM-DD';

function isEmpty(value) {
  return (0, _isUndefined2.default)(value) || value === null || (0, _isString2.default)(value) && value.trim() === '' || value === false || Array.isArray(value) && value.length === 0;
}

function isDecimal(value) {
  return value % 1 !== 0;
}

var inputType = exports.inputType = { date: false, number: false, time: false, month: false, week: false };

var inputTypeOverride = exports.inputTypeOverride = function inputTypeOverride(key, value) {
  inputType[key] = value;
};

/* istanbul ignore next  */
if (typeof document !== 'undefined' && typeof document.createElement === 'function') {
  var tester = document.createElement('input');

  for (var i in inputType) {
    if (inputType.hasOwnProperty(i)) {
      tester.setAttribute('type', i);
      tester.value = ':(';

      if (tester.type === i && tester.value === '') {
        inputType[i] = true;
      }
    }
  }
}