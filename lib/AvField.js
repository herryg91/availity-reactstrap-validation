'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _AvInput = require('./AvInput');

var _AvInput2 = _interopRequireDefault(_AvInput);

var _AvGroup = require('./AvGroup');

var _AvGroup2 = _interopRequireDefault(_AvGroup);

var _AvFeedback = require('./AvFeedback');

var _AvFeedback2 = _interopRequireDefault(_AvFeedback);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

var AvField = function (_Component) {
  (0, _inherits3.default)(AvField, _Component);

  function AvField() {
    (0, _classCallCheck3.default)(this, AvField);
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
  }

  AvField.prototype.getChildContext = function getChildContext() {
    var _this2 = this;

    this.FormCtrl = (0, _extends3.default)({}, this.context.FormCtrl);
    var registerValidator = this.FormCtrl.register;
    this.FormCtrl.register = function (input) {
      var updater = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : input && input.setState && input.setState.bind(input);

      registerValidator(input, function () {
        _this2.setState({});
        if (updater) updater({});
      });
    };
    return {
      FormCtrl: this.FormCtrl
    };
  };

  AvField.prototype.render = function render() {
    var row = false;
    var col = {};
    var labelCol = {};
    var _props = this.props,
        helpMessage = _props.helpMessage,
        label = _props.label,
        labelHidden = _props.labelHidden,
        inputClass = _props.inputClass,
        labelClass = _props.labelClass,
        children = _props.children,
        _props$id = _props.id,
        id = _props$id === undefined ? this.props.name : _props$id,
        size = _props.size,
        disabled = _props.disabled,
        readOnly = _props.readOnly,
        grid = _props.grid,
        labelAttrs = _props.labelAttrs,
        groupAttrs = _props.groupAttrs,
        attributes = (0, _objectWithoutProperties3.default)(_props, ['helpMessage', 'label', 'labelHidden', 'inputClass', 'labelClass', 'children', 'id', 'size', 'disabled', 'readOnly', 'grid', 'labelAttrs', 'groupAttrs']);


    if (grid) {
      colSizes.forEach(function (colSize) {
        if (grid[colSize]) {
          row = true;
          var sizeNum = parseInt(grid[colSize], 10);
          col[colSize] = sizeNum;
          labelCol[colSize] = 12 - sizeNum;
        }
      });
    }

    var input = _react2.default.createElement(
      _AvInput2.default,
      (0, _extends3.default)({
        id: id,
        className: inputClass,
        size: size,
        disabled: disabled,
        readOnly: readOnly
      }, attributes),
      children
    );

    var validation = this.context.FormCtrl.getInputState(this.props.name);

    var feedback = validation.errorMessage ? _react2.default.createElement(
      _AvFeedback2.default,
      null,
      validation.errorMessage
    ) : null;
    var help = helpMessage ? _react2.default.createElement(
      _reactstrap.FormText,
      null,
      helpMessage
    ) : null;
    var inputRow = row ? _react2.default.createElement(
      _reactstrap.Col,
      col,
      input,
      feedback,
      help
    ) : input;
    var check = attributes.type === 'checkbox';

    if ((check || attributes.type === 'radio' || attributes.type === 'switch') && (attributes.tag === _reactstrap.CustomInput || Array.isArray(attributes.tag) && attributes.tag[0] === _reactstrap.CustomInput)) {
      return _react2.default.createElement(
        _AvGroup2.default,
        { className: 'mb-0' },
        _react2.default.createElement(
          _AvInput2.default,
          this.props,
          feedback,
          help
        )
      );
    }

    return _react2.default.createElement(
      _AvGroup2.default,
      (0, _extends3.default)({ check: check, disabled: disabled, row: row }, groupAttrs),
      check && inputRow,
      label && _react2.default.createElement(
        _reactstrap.Label,
        (0, _extends3.default)({
          'for': id,
          className: labelClass,
          hidden: labelHidden,
          size: size
        }, labelCol, labelAttrs),
        label
      ),
      !check && inputRow,
      !row && feedback,
      !row && help
    );
  };

  return AvField;
}(_react.Component);

AvField.propTypes = (0, _assign2.default)({}, _AvInput2.default.propTypes, {
  label: _propTypes2.default.node,
  labelHidden: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  readOnly: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  inputClass: _propTypes2.default.string,
  labelClass: _propTypes2.default.string,
  helpMessage: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  errorMessage: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  labelAttrs: _propTypes2.default.object,
  groupAttrs: _propTypes2.default.object,
  grid: _propTypes2.default.object
});
AvField.contextTypes = {
  FormCtrl: _propTypes2.default.object.isRequired
};
AvField.childContextTypes = {
  FormCtrl: _propTypes2.default.object.isRequired
};
exports.default = AvField;