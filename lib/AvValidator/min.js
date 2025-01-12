'use strict';

exports.__esModule = true;
exports.default = validate;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _toNumber = require('lodash/toNumber');

var _toNumber2 = _interopRequireDefault(_toNumber);

var _utils = require('./utils');

var _minchecked = require('./minchecked');

var _minchecked2 = _interopRequireDefault(_minchecked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(value, context) {
  var constraint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var input = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (Array.isArray(input.value)) {
    return (0, _minchecked2.default)(value, context, constraint, input);
  }

  if ((0, _utils.isEmpty)(value)) return true;

  if (input.validations && input.validations.date || input.props && input.props.type && input.props.type.toLowerCase() === 'date') {
    return (0, _moment2.default)(value, [_utils.isoDateFormat, constraint.format || 'MM/DD/YYYY'], true).isSameOrAfter(constraint.value, 'day') || constraint.errorMessage || false;
  }

  var number = (0, _toNumber2.default)(value);

  return !isNaN(number) && isFinite(number) && number >= (0, _toNumber2.default)(constraint.value) || constraint.errorMessage || false;
}