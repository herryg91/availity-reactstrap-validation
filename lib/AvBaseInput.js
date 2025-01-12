'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var htmlValidationAttrs = ['min', 'max', 'minLength', 'maxLength', 'pattern', 'required', 'step'];

var htmlValidationTypes = ['email', 'date', 'datetime', 'number', 'tel', 'url'];

var AvBaseInput = function (_Component) {
  (0, _inherits3.default)(AvBaseInput, _Component);

  function AvBaseInput(props) {
    (0, _classCallCheck3.default)(this, AvBaseInput);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

    _this.state = { value: _this.props.multiple ? [] : '' };
    _this.validations = {};
    _this.value = '';
    _this.onKeyUpHandler = _this.onKeyUpHandler.bind(_this);
    _this.onInputHandler = _this.onInputHandler.bind(_this);
    _this.onBlurHandler = _this.onBlurHandler.bind(_this);
    _this.onFocusHandler = _this.onFocusHandler.bind(_this);
    _this.onChangeHandler = _this.onChangeHandler.bind(_this);
    _this.validate = _this.validate.bind(_this);
    return _this;
  }

  AvBaseInput.prototype.componentDidMount = function componentDidMount() {
    this.value = this.props.value || this.getDefaultValue();
    this.setState({ value: this.value });
    this.updateValidations();
  };

  AvBaseInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.context.FormCtrl.unregister(this);
    }
    if (nextProps.type === 'checkbox') {
      if (nextProps.checked !== this.props.checked) {
        if (nextProps.checked) {
          this.value = nextProps.trueValue;
        } else {
          this.value = nextProps.falseValue;
        }
        this.setState({ value: this.value });
      }
    } else {
      if (nextProps.multiple !== this.props.multiple) {
        this.value = nextProps.multiple ? [] : '';
        this.setState({ value: this.value });
      }
      if (nextProps.value !== this.props.value) {
        this.value = nextProps.value;
        this.setState({ value: nextProps.value });
      }
    }

    if (!(0, _isEqual2.default)(nextProps, this.props)) {
      this.updateValidations(nextProps);
    }
  };

  AvBaseInput.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.name !== this.props.name) {
      this.context.FormCtrl.register(this);
    }
  };

  AvBaseInput.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.FormCtrl.unregister(this);
  };

  AvBaseInput.prototype.onKeyUpHandler = function onKeyUpHandler(event) {
    var badInput = (0, _get2.default)(event, 'target.validity.badInput', false);
    if (badInput !== this.context.FormCtrl.isBad(this.props.name)) {
      this.context.FormCtrl.setBad(this.props.name, badInput);
      this.validate();
    }
    this.props.onKeyUp && this.props.onKeyUp(event);
  };

  AvBaseInput.prototype.onInputHandler = function onInputHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onInput', _value);
    !this.context.FormCtrl.isDirty(this.props.name) && this.context.FormCtrl.setDirty(this.props.name);
  };

  AvBaseInput.prototype.onBlurHandler = function onBlurHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onBlur', _value);
    !this.context.FormCtrl.isTouched(this.props.name) && this.context.FormCtrl.setTouched(this.props.name);
  };

  AvBaseInput.prototype.onFocusHandler = function onFocusHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onFocus', _value);
  };

  AvBaseInput.prototype.onChangeHandler = function onChangeHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onChange', _value);
    !this.context.FormCtrl.isDirty(this.props.name) && this.context.FormCtrl.setDirty(this.props.name);
  };

  AvBaseInput.prototype.getDefaultValue = function getDefaultValue() {
    var defaultValue = '';

    if (this.props.type === 'checkbox' || this.props.type === 'switch') {
      if (!(0, _isUndefined2.default)(this.props.defaultChecked)) {
        return this.props.defaultChecked ? this.props.trueValue : this.props.falseValue;
      }
      defaultValue = this.props.falseValue;
    }

    if (this.props.type === 'select' && this.props.multiple) {
      defaultValue = [];
    }

    var value = this.props.defaultValue || this.context.FormCtrl.getDefaultValue(this.props.name);

    if (this.props.type === 'checkbox' && value !== this.props.trueValue) {
      value = defaultValue;
    }

    return (0, _isUndefined2.default)(value) ? defaultValue : value;
  };

  AvBaseInput.prototype.getFieldValue = function getFieldValue(event) {
    if (this.props.type === 'checkbox') {
      return event.target.checked ? this.props.trueValue : this.props.falseValue;
    }

    if (this.props.type === 'select' && this.props.multiple) {
      /* // Something about this does not work when transpiled
      return [...event.target.options]
        .filter(({ selected }) => selected)
        .map(({ value }) => value); */
      var ret = [];
      var options = event.target.options;
      for (var i = 0; i < options.length; i++) {
        if (options[i].selected) {
          ret.push(options[i].value);
        }
      }
      return ret;
    }
    return event && event.target && !(0, _isUndefined2.default)(event.target.value) ? event.target.value : event;
  };

  AvBaseInput.prototype.getValidationEvent = function getValidationEvent() {
    var validationEvent = this.props.validationEvent ? this.props.validationEvent : this.context.FormCtrl.getValidationEvent();
    return Array.isArray(validationEvent) ? validationEvent : [validationEvent];
  };

  AvBaseInput.prototype.getValidatorProps = function getValidatorProps() {
    var _this2 = this;

    var validatity = this.context.FormCtrl.getInputState(this.props.name);
    var htmlValAttrs = (0, _keys2.default)(this.props.validate || {}).filter(function (val) {
      return htmlValidationAttrs.indexOf(val) > -1;
    }).reduce(function (result, item) {
      result[item] = _this2.props.validate[item].value || _this2.props.validate[item];
      return result;
    }, {});

    var newProps = (0, _extends3.default)({
      onKeyUp: this.onKeyUpHandler,
      onBlur: this.onBlurHandler,
      onInput: this.onInputHandler,
      onFocus: this.onFocusHandler,
      onChange: this.onChangeHandler,
      value: this.value
    }, htmlValAttrs);

    if (this.props.disabled === undefined && this.context.FormCtrl.isDisabled() !== undefined) {
      newProps.disabled = this.context.FormCtrl.isDisabled();
    }

    if (this.props.readOnly === undefined && this.context.FormCtrl.isReadOnly() !== undefined) {
      newProps.readOnly = this.context.FormCtrl.isReadOnly();
    }

    if (this.props.type === 'checkbox') {
      newProps.checked = this.value === this.props.trueValue;
    }

    if (this.props.state || validatity && validatity.errorMessage) {
      newProps.valid = !(validatity && validatity.errorMessage);
    }

    return newProps;
  };

  AvBaseInput.prototype.getValue = function getValue() {
    return this.value;
  };

  AvBaseInput.prototype.reset = function reset() {
    this.value = this.getDefaultValue();
    this.context.FormCtrl.setDirty(this.props.name, false);
    this.context.FormCtrl.setTouched(this.props.name, false);
    this.context.FormCtrl.setBad(this.props.name, false);
    this.setState({ value: this.value });
    this.validate();
    this.props.onReset && this.props.onReset(this.value);
  };

  AvBaseInput.prototype.validateEvent = function validateEvent(eventName, _event) {
    this.setState({ value: this.value });
    if (this.getValidationEvent().indexOf(eventName) > -1) {
      this.validate();
    }
    this.props[eventName] && this.props[eventName](_event, this.value);
  };

  AvBaseInput.prototype.validate = function validate() {
    this.context.FormCtrl.validate(this.props.name);
  };

  AvBaseInput.prototype.updateValidations = function updateValidations() {
    var _this3 = this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    this.validations = (0, _assign2.default)({}, props.validate);

    if (htmlValidationTypes.indexOf(props.type) > -1) {
      this.validations[props.type] = this.validations[props.type] || true;
    }

    (0, _keys2.default)(props).filter(function (val) {
      return htmlValidationAttrs.indexOf(val) > -1;
    }).forEach(function (attr) {
      if (props[attr]) {
        _this3.validations[attr] = _this3.validations[attr] || {
          value: props[attr]
        };
      } else {
        delete _this3.validations[attr];
      }
    });

    this.context.FormCtrl && this.context.FormCtrl.register(this);
    this.validate();
  };

  return AvBaseInput;
}(_react.Component);

AvBaseInput.propTypes = {
  name: _propTypes2.default.string.isRequired,
  validationEvent: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['', 'onInput', 'onChange', 'onBlur', 'onFocus']), _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['onInput', 'onChange', 'onBlur', 'onFocus']))]),
  validate: _propTypes2.default.object,
  value: _propTypes2.default.any,
  defaultValue: _propTypes2.default.any,
  trueValue: _propTypes2.default.any,
  falseValue: _propTypes2.default.any,
  checked: _propTypes2.default.bool,
  defaultChecked: _propTypes2.default.bool,
  state: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  multiple: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  onKeyUp: _propTypes2.default.func,
  onInput: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onReset: _propTypes2.default.func
};
AvBaseInput.contextTypes = {
  FormCtrl: _propTypes2.default.object.isRequired
};
AvBaseInput.defaultProps = {
  validationEvent: '',
  validate: {},
  trueValue: true,
  falseValue: false
};
exports.default = AvBaseInput;