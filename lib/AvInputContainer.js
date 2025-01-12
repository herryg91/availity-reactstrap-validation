'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validComponent(input) {
  var name = input && input.props ? input.props.name : undefined;

  if (!name) {
    throw new Error('Input ' + input + ' has no "name" prop');
  }

  return { name: name };
}

var InputContainer = function (_Component) {
  (0, _inherits3.default)(InputContainer, _Component);

  function InputContainer() {
    (0, _classCallCheck3.default)(this, InputContainer);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  InputContainer.prototype.componentDidMount = function componentDidMount() {
    this._updaters = {};
    this._inputs = {};
  };

  InputContainer.prototype.getOldInputName = function getOldInputName(input) {
    for (var key in this._inputs) {
      if (this._inputs[key] === input) {
        return key;
      }
    }
  };

  InputContainer.prototype.registerInput = function registerInput(input) {
    var updater = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : input && input.setState && input.setState.bind(input);

    var _validComponent = validComponent(input, updater),
        name = _validComponent.name;

    var oldName = this.getOldInputName(input);
    if (oldName !== name) {
      if (oldName) {
        this.unregisterInput({ props: { name: oldName } });
      }
      this._updaters[name] = updater;
      this._inputs[name] = input;
    }
  };

  InputContainer.prototype.unregisterInput = function unregisterInput(input) {
    var _validComponent2 = validComponent(input),
        name = _validComponent2.name;

    delete this._updaters[name];
    delete this._inputs[name];
  };

  return InputContainer;
}(_react.Component);

exports.default = InputContainer;