'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Source = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _isRetina = require('is-retina');

var _isRetina2 = _interopRequireDefault(_isRetina);

var _isClient = require('is-client');

var _isClient2 = _interopRequireDefault(_isClient);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (!global._babelPolyfill) {
  require('babel/polyfill');
}

var Source = exports.Source = function (_Component) {
  _inherits(Source, _Component);

  function Source() {
    _classCallCheck(this, Source);

    return _possibleConstructorReturn(this, (Source.__proto__ || Object.getPrototypeOf(Source)).apply(this, arguments));
  }

  _createClass(Source, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return Source;
}(_react.Component);

Source.displayName = 'Source';

var ImageResponsive = function (_Component2) {
  _inherits(ImageResponsive, _Component2);

  function ImageResponsive() {
    _classCallCheck(this, ImageResponsive);

    var _this2 = _possibleConstructorReturn(this, (ImageResponsive.__proto__ || Object.getPrototypeOf(ImageResponsive)).call(this));

    _this2.state = {
      width: false,
      loaded: true,
      src: false
    };

    _this2.src = null;
    _this2.isClient = (0, _isClient2.default)();
    _this2.isRetina = _isClient2.default && (0, _isRetina2.default)();
    _this2.handleResizeDebounced = (0, _lodash2.default)(_this2.handleResize, 300).bind(_this2);
    return _this2;
  }

  _createClass(ImageResponsive, [{
    key: 'handleResize',
    value: function handleResize() {
      this.setState({ 'src': this.pickOptimalSource(_reactDom2.default.findDOMNode(this.refs.element).offsetWidth, this.props) });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({ src: this.props.src });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (_isClient2.default) {
        this.handleResize();
        window.addEventListener('resize', this.handleResizeDebounced);
        if (this.props.type === 'image' && this.props.transition) {
          _reactDom2.default.findDOMNode(this.refs.element).addEventListener('load', this.onLoad.bind(this));
        }
      }
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.setState({ loaded: true });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ loaded: false });
      if (_isClient2.default) {
        window.removeEventListener('resize', this.handleResizeDebounced);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src && nextProps.src !== this.props.src) {
        this.setState({ 'src': this.pickOptimalSource(_reactDom2.default.findDOMNode(this.refs.element).offsetWidth, nextProps) }, this.handleResize);
      }
    }
  }, {
    key: 'pickOptimalSource',
    value: function pickOptimalSource(width, props) {
      var data = props.children.filter(this.isSource);

      var bestBiggerSource = _ramda2.default.head(_ramda2.default.sort(function (a, b) {
        return a.props.maxWidth > b.props.maxWidth;
      })(_ramda2.default.filter(function (a) {
        return a.props.maxWidth >= width;
      })(data)));
      var bestSmallerSource = _ramda2.default.head(_ramda2.default.sort(function (a, b) {
        return a.props.maxWidth < b.props.maxWidth;
      })(_ramda2.default.filter(function (a) {
        return a.props.maxWidth <= width;
      })(data)));

      var source = _ramda2.default.or(bestBiggerSource, bestSmallerSource);
      if (source) {
        return source.props.src;
      }

      return this.props.src;
    }
  }, {
    key: 'isSource',
    value: function isSource(item) {
      return item.type && item.type.displayName && item.type.displayName === 'Source';
    }
  }, {
    key: 'notSource',
    value: function notSource(item) {
      return !this.isSource(item);
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {};
      if (this.props.transition) {
        if (this.props.type === 'image') {
          style.transition = 'opacity .2s ease-in-out';
        }
      }
      if (this.props.type === 'image') {
        style.opacity = this.state.loaded ? 1 : 0;
      } else if (this.props.type === 'background-image') {
        style.backgroundSize = '100% 100%';
        if (this.state.src) {
          style.backgroundImage = 'url(\'' + this.state.src + '\')';
        }
        if (this.props.width) {
          style.width = this.props.width;
        }
        if (this.props.height) {
          style.height = this.props.height;
        }
      }
      style = (0, _objectAssign2.default)(style, this.props.style);
      var filteredChildren = this.props.children.filter(this.notSource.bind(this));
      return this.props.type === 'image' ? _react2.default.createElement(
        'img',
        _extends({ ref: 'element' }, this.props, { src: this.state.src, style: style }),
        filteredChildren
      ) : _react2.default.createElement(
        'div',
        _extends({ ref: 'element' }, this.props, { style: style }),
        filteredChildren
      );
    }
  }]);

  return ImageResponsive;
}(_react.Component);

ImageResponsive.propTypes = {
  src: _propTypes2.default.string.isRequired,
  type: _propTypes2.default.string.isRequired,
  transition: _propTypes2.default.bool.isRequired
};
ImageResponsive.defaultProps = {
  src: '',
  style: {},
  type: 'image',
  transition: true
};
exports.default = ImageResponsive;

