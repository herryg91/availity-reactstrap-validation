'use strict';

exports.__esModule = true;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _isUndefined = require('lodash/isUndefined');

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _reactstrap = require('reactstrap');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _AvFeedback = require('./AvFeedback');

var _AvFeedback2 = _interopRequireDefault(_AvFeedback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var htmlValidationAttrs = ['required'];

var noop = function noop() {};

var AvRadioGroup = function (_Component) {
  (0, _inherits3.default)(AvRadioGroup, _Component);

  function AvRadioGroup() {
    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, AvRadioGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = {
      invalidInputs: {},
      dirtyInputs: {},
      touchedInputs: {},
      badInputs: {},
      validate: {},
      value: ''
    }, _this._inputs = [], _this.value = '', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  AvRadioGroup.prototype.getChildContext = function getChildContext() {
    var _this2 = this;

    if (!this.FormCtrl) {
      this.FormCtrl = (0, _extends3.default)({}, this.context.FormCtrl);
      this.FormCtrl.register = this.registerInput.bind(this);
      this.FormCtrl.unregister = this.unregisterInput.bind(this);
      this.FormCtrl.validate = noop;
    }

    var updateGroup = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e, value) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this2.setState({ value: value });
                _this2.value = value;
                _context.next = 4;
                return _this2.validate();

              case 4:
                !_this2.context.FormCtrl.isTouched(_this2.props.name) && _this2.context.FormCtrl.setTouched(_this2.props.name);
                !_this2.context.FormCtrl.isDirty(_this2.props.name) && _this2.context.FormCtrl.setDirty(_this2.props.name);
                _this2.props.onChange && _this2.props.onChange(e, value);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function updateGroup(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    return {
      Group: {
        getProps: function getProps() {
          return {
            name: _this2.props.name,
            inline: _this2.props.inline,
            required: _this2.props.required || !!(_this2.validations.required && _this2.validations.required.value),
            value: _this2.value
          };
        },
        update: updateGroup,
        getValue: function getValue() {
          return _this2.value;
        },
        getInputState: this.getInputState.bind(this)
      },
      FormCtrl: this.FormCtrl
    };
  };

  AvRadioGroup.prototype.componentDidMount = function componentDidMount() {
    this.value = this.props.value || this.getDefaultValue().value;
    this.setState({ value: this.value });
    this.updateValidations();
  };

  AvRadioGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.context.FormCtrl.unregister(this);
    }
    if (nextProps.value !== this.props.value) {
      this.value = nextProps.value;
      this.setState({ value: nextProps.value });
    }
    if (!(0, _isEqual2.default)(nextProps, this.props)) {
      this.updateValidations(nextProps);
    }
  };

  AvRadioGroup.prototype.componentWillUnmount = function componentWillUnmount() {
    this.context.FormCtrl.unregister(this);
  };

  AvRadioGroup.prototype.getValue = function getValue() {
    return this.value;
  };

  AvRadioGroup.prototype.getInputState = function getInputState() {
    return this.context.FormCtrl.getInputState(this.props.name);
  };

  AvRadioGroup.prototype.getDefaultValue = function getDefaultValue() {
    var key = 'defaultValue';

    var value = '';
    if (!(0, _isUndefined2.default)(this.props[key])) {
      value = this.props[key];
    } else if (!(0, _isUndefined2.default)(this.context.FormCtrl.getDefaultValue(this.props.name))) {
      value = this.context.FormCtrl.getDefaultValue(this.props.name);
    }

    return { key: key, value: value };
  };

  AvRadioGroup.prototype.validate = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.context.FormCtrl.validate(this.props.name);

            case 2:
              this.updateInputs();

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function validate() {
      return _ref2.apply(this, arguments);
    }

    return validate;
  }();

  AvRadioGroup.prototype.update = function update() {
    this.setState({});
    this.updateInputs();
  };

  AvRadioGroup.prototype.updateValidations = function updateValidations() {
    var _this3 = this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

    this.validations = (0, _assign2.default)({}, props.validate);

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

    this.context.FormCtrl.register(this, this.update.bind(this));
    this.validate();
  };

  AvRadioGroup.prototype.updateInputs = function updateInputs() {
    this._inputs.forEach(function (input) {
      return input.setState.call(input, {});
    });
    this.setState({});
  };

  AvRadioGroup.prototype.reset = function reset() {
    this.value = this.getDefaultValue().value;
    this.context.FormCtrl.setDirty(this.props.name, false);
    this.context.FormCtrl.setTouched(this.props.name, false);
    this.context.FormCtrl.setBad(this.props.name, false);
    this.setState({ value: this.value });
    this.validate();
    this.props.onReset && this.props.onReset(this.value);
  };

  AvRadioGroup.prototype.registerInput = function registerInput(input) {
    if (this._inputs.indexOf(input) < 0) {
      this._inputs.push(input);
    }
  };

  AvRadioGroup.prototype.unregisterInput = function unregisterInput(input) {
    this._inputs = this._inputs.filter(function (ipt) {
      return ipt !== input;
    });
  };

  AvRadioGroup.prototype.render = function render() {
    var legend = this.props.label ? _react2.default.createElement(
      'legend',
      null,
      this.props.label
    ) : '';
    var validation = this.getInputState();
    var _props = this.props,
        omit1 = _props.errorMessage,
        omit2 = _props.validate,
        omit3 = _props.validationEvent,
        omit4 = _props.state,
        omit5 = _props.label,
        omit6 = _props.required,
        omit7 = _props.inline,
        children = _props.children,
        attributes = (0, _objectWithoutProperties3.default)(_props, ['errorMessage', 'validate', 'validationEvent', 'state', 'label', 'required', 'inline', 'children']);


    var touched = this.context.FormCtrl.isTouched(this.props.name);
    var hasError = this.context.FormCtrl.hasError(this.props.name);

    var classes = (0, _classnames2.default)('form-control border-0 p-0 h-auto', touched ? 'is-touched' : 'is-untouched', this.context.FormCtrl.isDirty(this.props.name) ? 'is-dirty' : 'is-pristine', this.context.FormCtrl.isBad(this.props.name) ? 'is-bad-input' : null, hasError ? 'av-invalid' : 'av-valid', touched && hasError && 'is-invalid');

    var groupClass = (0, _classnames2.default)(attributes.className, touched && hasError && 'was-validated');

    return _react2.default.createElement(
      _reactstrap.FormGroup,
      (0, _extends3.default)({ tag: 'fieldset' }, attributes, { className: groupClass }),
      legend,
      _react2.default.createElement(
        'div',
        { className: classes },
        children
      ),
      _react2.default.createElement(
        _AvFeedback2.default,
        null,
        validation.errorMessage
      )
    );
  };

  return AvRadioGroup;
}(_react.Component);

AvRadioGroup.propTypes = (0, _assign2.default)({}, _reactstrap.FormGroup.propTypes, {
  name: _propTypes2.default.string.isRequired
});
AvRadioGroup.contextTypes = {
  FormCtrl: _propTypes2.default.object.isRequired
};
AvRadioGroup.childContextTypes = {
  Group: _propTypes2.default.object.isRequired,
  FormCtrl: _propTypes2.default.object.isRequired
};
exports.default = AvRadioGroup;