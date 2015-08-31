'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashDebounce = require('lodash.debounce');

var _lodashDebounce2 = _interopRequireDefault(_lodashDebounce);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _isRetina = require('is-retina');

var _isRetina2 = _interopRequireDefault(_isRetina);

var _isClient = require('is-client');

var _isClient2 = _interopRequireDefault(_isClient);

if (!global._babelPolyfill) {
  require('babel/polyfill');
}

var Source = (function (_Component) {
  _inherits(Source, _Component);

  function Source() {
    _classCallCheck(this, Source);

    _get(Object.getPrototypeOf(Source.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Source, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'displayName',
    value: 'Source',
    enumerable: true
  }]);

  return Source;
})(_react.Component);

exports.Source = Source;

var ImageResponsive = (function (_Component2) {
  _inherits(ImageResponsive, _Component2);

  _createClass(ImageResponsive, null, [{
    key: 'propTypes',
    value: {
      src: _react.PropTypes.string.isRequired,
      type: _react.PropTypes.string.isRequired,
      transition: _react.PropTypes.bool.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      style: {},
      type: 'image',
      transition: true
    },
    enumerable: true
  }]);

  function ImageResponsive() {
    _classCallCheck(this, ImageResponsive);

    _get(Object.getPrototypeOf(ImageResponsive.prototype), 'constructor', this).call(this);
    this.state = {
      width: false,
      loaded: true,
      src: false
    };
    this.src = null;
    this.isClient = (0, _isClient2['default'])();
    this.isRetina = _isClient2['default'] && (0, _isRetina2['default'])();
    this.handleResizeDebounced = (0, _lodashDebounce2['default'])(this.handleResize, 300).bind(this);
  }

  _createClass(ImageResponsive, [{
    key: 'handleResize',
    value: function handleResize() {
      this.setState({ 'src': this.pickOptimalSource(_react2['default'].findDOMNode(this.refs.element).offsetWidth, this.props) });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (_isClient2['default']) {
        this.handleResize();
        window.addEventListener('resize', this.handleResizeDebounced);
        if (this.props.type === 'image' && this.props.transition) {
          _react2['default'].findDOMNode(this.refs.element).addEventListener('load', this.onLoad.bind(this));
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
      if (_isClient2['default']) {
        window.removeEventListener('resize', this.handleResizeDebounced);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.src && nextProps.src !== this.props.src) {
        this.setState({ 'src': this.pickOptimalSource(_react2['default'].findDOMNode(this.refs.element).offsetWidth, nextProps) });
      }
    }
  }, {
    key: 'pickOptimalSource',
    value: function pickOptimalSource(width, props) {
      var sources = props.children.filter(this.isSource).sort(function (a, b) {
        return a.props.maxWidth > b.props.maxWidth;
      });
      var resultSource = undefined;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var source = _step.value;

          var maxWidth = this.isRetina ? source.props.maxWidth / 2 : source.props.maxWidth;
          if (width < maxWidth) {
            resultSource = source;
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return resultSource ? resultSource.props.src : this.props.src;
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
        style.backgroundImage = 'url(\'' + this.state.src + '\')';
        if (this.props.width) {
          style.width = this.props.width;
        }
        if (this.props.height) {
          style.height = this.props.height;
        }
      }
      style = (0, _objectAssign2['default'])(style, this.props.style);
      var filteredChildren = this.props.children.filter(this.notSource.bind(this));
      return this.props.type === 'image' ? _react2['default'].createElement(
        'img',
        _extends({ ref: 'element' }, this.props, { src: this.state.src, style: style }),
        filteredChildren
      ) : _react2['default'].createElement(
        'div',
        _extends({ ref: 'element' }, this.props, { style: style }),
        filteredChildren
      );
    }
  }]);

  return ImageResponsive;
})(_react.Component);

exports['default'] = ImageResponsive;

