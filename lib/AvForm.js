'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AvInputContainer = require('./AvInputContainer');

var _AvInputContainer2 = _interopRequireDefault(_AvInputContainer);

var _AvValidator = require('./AvValidator');

var _AvValidator2 = _interopRequireDefault(_AvValidator);

var _reactstrap = require('reactstrap');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _throttle2 = require('lodash/throttle');

var _throttle3 = _interopRequireDefault(_throttle2);

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getInputErrorMessage = function getInputErrorMessage(input, ruleName) {
  var errorMessage = input && input.props && input.props.errorMessage;

  if ((typeof errorMessage === 'undefined' ? 'undefined' : (0, _typeof3.default)(errorMessage)) === 'object') {
    return errorMessage[ruleName];
  }
  return errorMessage;
};

var AvForm = function (_InputContainer) {
  (0, _inherits3.default)(AvForm, _InputContainer);

  function AvForm() {
    var _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AvForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _InputContainer.call.apply(_InputContainer, [this].concat(args))), _this), _this._isMounted = false, _this.state = {
      invalidInputs: {},
      dirtyInputs: {},
      touchedInputs: {},
      badInputs: {},
      submitted: false
    }, _this.validations = {}, _this.handleSubmit = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
        var values, _ref2, isValid, errors;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_this.props.beforeSubmitValidation) {
                  _this.props.beforeSubmitValidation(e);
                }

                if (e && typeof e.preventDefault === 'function') {
                  e.preventDefault();
                }

                if (!_this.props.disabled) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return');

              case 4:
                values = _this.getValues();
                _context.next = 7;
                return _this.validateAll(values, false);

              case 7:
                _ref2 = _context.sent;
                isValid = _ref2.isValid;
                errors = _ref2.errors;


                _this.setTouched((0, _keys2.default)(_this._inputs), true, false);

                _this.updateInputs();

                _this.props.onSubmit(e, errors, values);
                if (isValid) {
                  _this.props.onValidSubmit(e, values);
                } else {
                  _this.props.onInvalidSubmit(e, errors, values);
                }

                !_this.state.submitted && _this._isMounted && _this.setState({ submitted: true });

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }(), _this.handleNonFormSubmission = function (event) {
      if (_this.props.onKeyDown(event) !== false) {
        if (event.type === 'keydown' && (event.which === 13 || event.keyCode === 13 || event.key === 'Enter')) {
          event.stopPropagation();
          event.preventDefault();
          _this.handleSubmit(event);
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  AvForm.prototype.getChildContext = function getChildContext() {
    var _this3 = this;

    return {
      FormCtrl: {
        getDefaultValue: this.getDefaultValue.bind(this),
        getInputState: this.getInputState.bind(this),
        getInput: function getInput(name) {
          return _this3._inputs[name];
        },
        getInputValue: this.getValue.bind(this),
        getInputs: this.getInputs.bind(this),
        getValues: this.getValues.bind(this),
        hasError: this.hasError.bind(this),
        isDirty: this.isDirty.bind(this),
        isTouched: this.isTouched.bind(this),
        isBad: this.isBad.bind(this),
        isDisabled: function isDisabled() {
          return _this3.props.disabled;
        },
        isReadOnly: function isReadOnly() {
          return _this3.props.readOnly;
        },
        setDirty: this.setDirty.bind(this),
        setTouched: this.setTouched.bind(this),
        setBad: this.setBad.bind(this),
        register: this.registerInput.bind(this),
        unregister: this.unregisterInput.bind(this),
        validate: this.validateInput.bind(this),
        getValidationEvent: function getValidationEvent() {
          return _this3.props.validationEvent;
        },
        parent: this.context.FormCtrl || null
      }
    };
  };

  AvForm.prototype.componentWillUnmount = function componentWillUnmount() {
    this._isMounted = false;
  };

  AvForm.prototype.componentDidMount = function componentDidMount() {
    this._isMounted = true;
    _InputContainer.prototype.componentDidMount.call(this);

    this._validators = {};
  };

  AvForm.prototype.registerInput = function registerInput(input, updater) {
    _InputContainer.prototype.registerInput.call(this, input, updater);

    if ((0, _typeof3.default)(input.validations) === 'object') {
      this._validators[input.props.name] = this.compileValidationRules(input, input.validations);
    }
  };

  AvForm.prototype.unregisterInput = function unregisterInput(input) {
    _InputContainer.prototype.unregisterInput.call(this, input);

    delete this._validators[input.props.name];
    this.setError(input.props.name, false);
    this.setDirty(input.props.name, false);
    this.setTouched(input.props.name, false);
    this.setBad(input.props.name, false);
  };

  AvForm.prototype.render = function render() {
    var _props = this.props,
        Tag = _props.tag,
        omit1 = _props.errorMessage,
        omit2 = _props.model,
        omit3 = _props.onValidSubmit,
        omit4 = _props.onInvalidSubmit,
        omit5 = _props.validate,
        omit6 = _props.validateOne,
        omit7 = _props.validateAll,
        omit8 = _props.validationEvent,
        omit9 = _props.disabled,
        omit10 = _props.readOnly,
        omit11 = _props.beforeSubmitValidation,
        className = _props.className,
        attributes = (0, _objectWithoutProperties3.default)(_props, ['tag', 'errorMessage', 'model', 'onValidSubmit', 'onInvalidSubmit', 'validate', 'validateOne', 'validateAll', 'validationEvent', 'disabled', 'readOnly', 'beforeSubmitValidation', 'className']);


    var classes = (0, _classnames2.default)(className, this.state.submitted ? 'av-submitted' : false, (0, _keys2.default)(this.state.invalidInputs).length > 0 ? 'av-invalid' : 'av-valid');

    if (Tag !== 'form' && Tag !== _reactstrap.Form) {
      attributes.onKeyDown = this.handleNonFormSubmission;
    }

    return _react2.default.createElement(Tag, (0, _extends3.default)({ noValidate: true,
      action: '#'
    }, attributes, {
      className: classes,
      onSubmit: this.handleSubmit
    }));
  };

  AvForm.prototype.getInputs = function getInputs() {
    return this._inputs;
  };

  AvForm.prototype.getValues = function getValues() {
    var _this4 = this;

    return (0, _keys2.default)(this._inputs).reduce(function (values, inputName) {
      (0, _set3.default)(values, inputName, _this4.getValue(inputName));

      return values;
    }, {});
  };

  AvForm.prototype.submit = function submit() {
    this.handleSubmit.apply(this, arguments);
  };

  AvForm.prototype.reset = function reset() {
    var _this5 = this;

    (0, _keys2.default)(this._inputs).forEach(function (inputName) {
      return _this5._inputs[inputName] && _this5._inputs[inputName].reset();
    });
  };

  AvForm.prototype.updateInputs = function updateInputs() {
    var _this6 = this;

    if (this.throttledUpdateInputs) {
      this.throttledUpdateInputs();
      return;
    }
    // this is just until a more intelligent way to determine which inputs need updated is implemented in v3
    this.throttledUpdateInputs = (0, _throttle3.default)(function () {
      (0, _keys2.default)(_this6._updaters).forEach(function (inputName) {
        return _this6._updaters[inputName] && _this6._inputs[inputName] && _this6._updaters[inputName].call(_this6._inputs[inputName], {});
      });
    }, 250);
    this.updateInputs();
  };

  AvForm.prototype.validateInput = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(name) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.validateOne(name, this.getValues());

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function validateInput(_x2) {
      return _ref3.apply(this, arguments);
    }

    return validateInput;
  }();

  AvForm.prototype.getInputState = function getInputState(inputName) {
    var errorMessage = void 0;
    var error = this.isTouched(inputName) && this.hasError(inputName);
    var color = void 0;

    if (error) {
      errorMessage = this.state.invalidInputs[inputName];
      color = 'danger';
      if (!(0, _isString2.default)(errorMessage)) {
        errorMessage = 'This field is invalid';
      }
    }

    return { color: color, error: error, errorMessage: errorMessage };
  };

  AvForm.prototype.hasError = function hasError(inputName) {
    return inputName ? !!this.state.invalidInputs[inputName] : (0, _keys2.default)(this.state.invalidInputs).length > 0;
  };

  AvForm.prototype.isDirty = function isDirty(inputName) {
    return inputName ? !!this.state.dirtyInputs[inputName] : (0, _keys2.default)(this.state.dirtyInputs).length > 0;
  };

  AvForm.prototype.isTouched = function isTouched(inputName) {
    return inputName ? !!this.state.touchedInputs[inputName] : (0, _keys2.default)(this.state.touchedInputs).length > 0;
  };

  AvForm.prototype.isBad = function isBad(inputName) {
    return inputName ? !!this.state.badInputs[inputName] : (0, _keys2.default)(this.state.badInputs).length > 0;
  };

  AvForm.prototype.setError = function setError(inputName) {
    var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var _this7 = this;

    var errText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : error;
    var update = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if (error && !(0, _isString2.default)(errText) && typeof errText !== 'boolean') {
      errText = errText + '';
    }
    var changed = false;
    var currentError = this.hasError(inputName);
    var invalidInputs = this.state.invalidInputs;

    if ((invalidInputs[inputName] === undefined && !error || invalidInputs[inputName] === (errText || true)) && error === currentError) return;
    if (error) {
      invalidInputs[inputName] = errText || true;
      changed = true;
    } else {
      delete invalidInputs[inputName];
      changed = true;
    }

    if (!changed) return;

    invalidInputs = (0, _extends3.default)({}, this.state.invalidInputs);
    this._isMounted && this.setState({ invalidInputs: invalidInputs }, function () {
      if (update) _this7.updateInputs();
    });
  };

  AvForm.prototype.setDirty = function setDirty(inputs) {
    var _this8 = this;

    var dirty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var dirtyInputs = this.state.dirtyInputs;
    var changed = false;
    if (!Array.isArray(inputs)) {
      inputs = [inputs];
    }
    inputs.forEach(function (inputName) {
      if (dirty && !dirtyInputs[inputName]) {
        dirtyInputs[inputName] = true;
        changed = true;
      } else if (!dirty && dirtyInputs[inputName]) {
        delete dirtyInputs[inputName];
        changed = true;
      }
    });

    if (!changed) return;

    dirtyInputs = (0, _extends3.default)({}, this.state.dirtyInputs);
    this._isMounted && this.setState({ dirtyInputs: dirtyInputs }, function () {
      if (update) _this8.updateInputs();
    });
  };

  AvForm.prototype.setTouched = function setTouched(inputs) {
    var _this9 = this;

    var touched = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var touchedInputs = this.state.touchedInputs;
    var changed = false;
    if (!Array.isArray(inputs)) {
      inputs = [inputs];
    }
    inputs.forEach(function (inputName) {
      if (touched && !touchedInputs[inputName]) {
        touchedInputs[inputName] = true;
        changed = true;
      } else if (!touched && touchedInputs[inputName]) {
        delete touchedInputs[inputName];
        changed = true;
      }
    });

    if (!changed) return;

    touchedInputs = (0, _extends3.default)({}, this.state.touchedInputs);
    this._isMounted && this.setState({ touchedInputs: touchedInputs }, function () {
      if (update) _this9.updateInputs();
    });
  };

  AvForm.prototype.setBad = function setBad(inputs) {
    var _this10 = this;

    var isBad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var badInputs = this.state.badInputs;
    var changed = false;
    if (!Array.isArray(inputs)) {
      inputs = [inputs];
    }
    inputs.forEach(function (inputName) {
      if (isBad && !badInputs[inputName]) {
        badInputs[inputName] = true;
        changed = true;
      } else if (!isBad && badInputs[inputName]) {
        delete badInputs[inputName];
        changed = true;
      }
    });

    if (!changed) return;

    badInputs = (0, _extends3.default)({}, this.state.badInputs);
    this._isMounted && this.setState({ badInputs: badInputs }, function () {
      if (update) _this10.updateInputs();
    });
  };

  AvForm.prototype.validateOne = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(inputName, context) {
      var update = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var input, value, validate, isValid, result, error;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              input = this._inputs[inputName];

              if (!Array.isArray(input)) {
                _context3.next = 3;
                break;
              }

              throw new Error('Multiple inputs cannot use the same name: "' + inputName + '"');

            case 3:
              value = (0, _get3.default)(context, inputName);
              validate = input.validations;
              isValid = true;
              result = void 0;
              error = void 0;

              if (!(typeof validate === 'function')) {
                _context3.next = 14;
                break;
              }

              _context3.next = 11;
              return validate(value, context, input);

            case 11:
              result = _context3.sent;
              _context3.next = 21;
              break;

            case 14:
              if (!((typeof validate === 'undefined' ? 'undefined' : (0, _typeof3.default)(validate)) === 'object')) {
                _context3.next = 20;
                break;
              }

              _context3.next = 17;
              return this._validators[inputName](value, context);

            case 17:
              result = _context3.sent;
              _context3.next = 21;
              break;

            case 20:
              result = true;

            case 21:

              if (result !== true) {
                isValid = false;

                if ((0, _isString2.default)(result)) {
                  error = result;
                }
              }

              this.setError(inputName, !isValid, error, update);

              return _context3.abrupt('return', isValid);

            case 24:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function validateOne(_x12, _x13) {
      return _ref4.apply(this, arguments);
    }

    return validateOne;
  }();

  AvForm.prototype.validateAll = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(context) {
      var update = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var errors, isValid, inputName, valid, formLevelValidation;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              errors = [];
              isValid = true;
              _context4.t0 = _regenerator2.default.keys(this._inputs);

            case 3:
              if ((_context4.t1 = _context4.t0()).done) {
                _context4.next = 12;
                break;
              }

              inputName = _context4.t1.value;

              if (!this._inputs.hasOwnProperty(inputName)) {
                _context4.next = 10;
                break;
              }

              _context4.next = 8;
              return this.validateOne(inputName, context, update);

            case 8:
              valid = _context4.sent;

              if (!valid) {
                isValid = false;
                errors.push(inputName);
              }

            case 10:
              _context4.next = 3;
              break;

            case 12:

              if (this.props.validate) {
                formLevelValidation = this.props.validate;

                if (!Array.isArray(formLevelValidation)) {
                  formLevelValidation = [formLevelValidation];
                }

                if (!formLevelValidation.every(function (validationFn) {
                  return validationFn(context);
                })) {
                  isValid = false;
                  errors.push('*');
                }
              }

              return _context4.abrupt('return', {
                isValid: isValid,
                errors: errors
              });

            case 14:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function validateAll(_x15) {
      return _ref5.apply(this, arguments);
    }

    return validateAll;
  }();

  AvForm.prototype.compileValidationRules = function compileValidationRules(input, ruleProp) {
    var _this11 = this;

    return function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(val, context) {
        var result, validations, _loop, rule;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!_this11.isBad(input.props.name)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt('return', false);

              case 2:
                result = true;
                validations = [];

                _loop = function _loop(rule) {
                  /* istanbul ignore else  */
                  if (ruleProp.hasOwnProperty(rule)) {
                    var ruleResult = void 0;

                    var promise = new _promise2.default(function (resolve, reject) {
                      var callback = function callback(value) {
                        return resolve({ value: value, rule: rule });
                      };

                      if (typeof ruleProp[rule] === 'function') {
                        ruleResult = ruleProp[rule](val, context, input, callback);
                      } else {
                        if (typeof _AvValidator2.default[rule] !== 'function') {
                          return reject(new Error('Invalid input validation rule: "' + rule + '"'));
                        }

                        if (ruleProp[rule].enabled === false) {
                          ruleResult = true;
                        } else {
                          ruleResult = _AvValidator2.default[rule](val, context, ruleProp[rule], input, callback);
                        }
                      }

                      if (ruleResult && typeof ruleResult.then === 'function') {
                        ruleResult.then(callback);
                      } else if (ruleResult !== undefined) {
                        callback(ruleResult);
                      } else {
                        // they are using the callback
                      }
                    });

                    validations.push(promise);
                  }
                };

                for (rule in ruleProp) {
                  _loop(rule);
                }

                _context5.next = 8;
                return _promise2.default.all(validations).then(function (results) {
                  results.every(function (ruleResult) {
                    if (result === true && ruleResult.value !== true) {
                      result = (0, _isString2.default)(ruleResult.value) && ruleResult.value || getInputErrorMessage(input, ruleResult.rule) || getInputErrorMessage(_this11, ruleResult.rule) || false;
                    }
                    return result === true;
                  });
                });

              case 8:
                return _context5.abrupt('return', result);

              case 9:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this11);
      }));

      return function (_x17, _x18) {
        return _ref6.apply(this, arguments);
      };
    }();
  };

  AvForm.prototype.getDefaultValue = function getDefaultValue(inputName) {
    return (0, _get3.default)(this.props.model, inputName);
  };

  AvForm.prototype.getValue = function getValue(inputName) {
    var input = this._inputs[inputName];

    if (!input) return undefined;

    if (Array.isArray(input)) {
      throw new Error('Multiple inputs cannot use the same name: "' + inputName + '"');
    }

    return input.getValue();
  };

  return AvForm;
}(_AvInputContainer2.default);

AvForm.childContextTypes = {
  FormCtrl: _propTypes2.default.object.isRequired
};
AvForm.contextTypes = {
  FormCtrl: _propTypes2.default.object
};
AvForm.propTypes = {
  tag: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
  className: _propTypes2.default.string,
  model: _propTypes2.default.object,
  method: _propTypes2.default.oneOf(['get', 'post']),
  onSubmit: _propTypes2.default.func,
  beforeSubmitValidation: _propTypes2.default.func,
  validate: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.array]),
  onValidSubmit: _propTypes2.default.func,
  onInvalidSubmit: _propTypes2.default.func,
  validationEvent: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['onInput', 'onChange', 'onBlur', 'onFocus']), _propTypes2.default.arrayOf(_propTypes2.default.oneOf(['onInput', 'onChange', 'onBlur', 'onFocus']))]),
  errorMessage: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string, _propTypes2.default.node]),
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool
};
AvForm.defaultProps = {
  tag: _reactstrap.Form,
  model: {},
  validationEvent: ['onChange', 'onInput'],
  method: 'get',
  onSubmit: function onSubmit() {},
  onKeyDown: function onKeyDown() {},
  onValidSubmit: function onValidSubmit() {},
  onInvalidSubmit: function onInvalidSubmit() {}
};
exports.default = AvForm;