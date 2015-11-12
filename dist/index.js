'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _punycode = require('punycode');

var _punycode2 = _interopRequireDefault(_punycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PasswordField = (function (_React$Component) {
  _inherits(PasswordField, _React$Component);

  function PasswordField(props) {
    _classCallCheck(this, PasswordField);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PasswordField).call(this, props));

    _this.state = { value: props.value || '' };
    return _this;
  }

  _createClass(PasswordField, [{
    key: 'getMask',
    value: function getMask() {
      var _props$mask = this.props.mask;
      var mask = _props$mask === undefined ? "•" : _props$mask;

      return mask.repeat(this.decode().length);
    }
  }, {
    key: 'encode',
    value: function encode() {
      var str = arguments.length <= 0 || arguments[0] === undefined ? this.value : arguments[0];

      return _punycode2.default.ucs2.encode(str);
    }
  }, {
    key: 'decode',
    value: function decode() {
      var str = arguments.length <= 0 || arguments[0] === undefined ? this.value : arguments[0];

      return _punycode2.default.ucs2.decode(str);
    }
  }, {
    key: 'changeHandler',
    value: function changeHandler(e) {
      var oldChars = this.decode();
      var newChars = this.decode(e.target.value);
      var newValue = undefined;
      if (oldChars.length < newChars.length) {
        var addedChars = newChars.slice(oldChars.length);
        newValue = [].concat(oldChars, addedChars);
      } else {
        newValue = oldChars.slice(0, newChars.length);
      }
      this.setState({ value: this.encode(newValue) });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', {
        type: 'text',
        value: this.getMask(),
        onChange: this.changeHandler.bind(this), __source: {
          fileName: '../../../../../src/index.js',
          lineNumber: 42
        }
      });
    }
  }, {
    key: 'value',
    get: function get() {
      return this.state.value;
    }
  }]);

  return PasswordField;
})(_react2.default.Component);

exports.default = PasswordField;
