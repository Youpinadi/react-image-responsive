'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _isRetina = require('is-retina');

var _isRetina2 = _interopRequireDefault(_isRetina);

var _isClient = require('is-client');

var _isClient2 = _interopRequireDefault(_isClient);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageResponsive = function (_Component) {
    _inherits(ImageResponsive, _Component);

    function ImageResponsive() {
        _classCallCheck(this, ImageResponsive);

        var _this = _possibleConstructorReturn(this, (ImageResponsive.__proto__ || Object.getPrototypeOf(ImageResponsive)).call(this));

        _this.handleResize = function () {
            _this.setState({
                src: _this.pickOptimalSource(_this.node.offsetWidth)
            });
        };

        _this.onLoad = function () {
            _this.setState({ loaded: true });
        };

        _this.pickOptimalSource = function (width) {
            var _this$props = _this.props,
                src = _this$props.src,
                sources = _this$props.sources;

            var sortedSources = sources.sort(function (a, b) {
                return a.maxWidth > b.maxWidth;
            });
            var bestBiggerSource = sortedSources.filter(function (a) {
                return a.maxWidth >= width;
            })[0];

            var bestSmallerSource = sortedSources.reduce(function (memo, source) {
                return source.maxWidth <= width ? source : memo;
            }, null);

            var source = bestBiggerSource || bestSmallerSource;
            if (source) {
                return source.src;
            }

            return src;
        };

        _this.state = {
            width: false,
            loaded: true,
            src: false
        };

        _this.src = null;
        _this.isClient = (0, _isClient2.default)();
        _this.isRetina = _isClient2.default && (0, _isRetina2.default)();
        _this.handleResizeDebounced = (0, _lodash2.default)(_this.handleResize, 150);
        return _this;
    }

    _createClass(ImageResponsive, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                type = _props.type,
                transition = _props.transition;

            if (_isClient2.default) {
                this.handleResize();
                window.addEventListener('resize', this.handleResizeDebounced);
                if (type === 'image' && transition) {
                    this.node.addEventListener('load', this.onLoad);
                }
            }
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
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                sources = _props2.sources,
                width = _props2.width,
                type = _props2.type,
                transition = _props2.transition,
                children = _props2.children,
                height = _props2.height,
                alt = _props2.alt,
                otherProps = _objectWithoutProperties(_props2, ['sources', 'width', 'type', 'transition', 'children', 'height', 'alt']);

            var style = {};
            if (transition) {
                if (type === 'image') {
                    style.transition = 'opacity .2s ease-in-out';
                }
            }
            if (type === 'image') {
                style.opacity = this.state.loaded ? 1 : 0;
            } else if (type === 'background-image') {
                style.backgroundSize = '100% 100%';
                if (this.state.src) {
                    style.backgroundImage = 'url(\'' + this.state.src + '\')';
                }
                if (width) {
                    style.width = width;
                }
                if (height) {
                    style.height = height;
                }
            }
            style = _extends({}, style, style);
            return type === 'image' ? _react2.default.createElement('img', _extends({
                ref: function ref(node) {
                    return _this2.node = node;
                }
            }, otherProps, {
                alt: alt,
                src: this.state.src,
                style: style
            })) : _react2.default.createElement(
                'div',
                _extends({ ref: function ref(node) {
                        return _this2.node = node;
                    } }, otherProps, { style: style }),
                children
            );
        }
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(nextProps, prevState) {
            if (!prevState.src) {
                return nextProps.src;
            }
            if (nextProps.src !== prevState.src || !_isClient2.default) {
                return null;
            }

            return {
                src: this.pickOptimalSource(this.node.offsetWidth, nextProps)
            };
        }
    }]);

    return ImageResponsive;
}(_react.Component);

ImageResponsive.propTypes = {
    src: _propTypes2.default.string.isRequired,
    type: _propTypes2.default.string,
    transition: _propTypes2.default.bool
};
ImageResponsive.defaultProps = {
    src: '',
    style: {},
    type: 'image',
    transition: true
};
exports.default = ImageResponsive;
