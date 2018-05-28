import React, { Component } from 'react';
import debounce from 'lodash.debounce';
import isRetina from 'is-retina';
import isClient from 'is-client';
import PropTypes from 'prop-types';

export default class ImageResponsive extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        type: PropTypes.string,
        transition: PropTypes.bool
    };
    static defaultProps = {
        src: '',
        style: {},
        type: 'image',
        transition: true
    };
    constructor() {
        super();
        this.state = {
            width: false,
            loaded: true,
            src: ''
        };

        this.src = null;
        this.isClient = isClient();
        this.isRetina = isClient && isRetina();
        this.handleResizeDebounced = debounce(this.handleResize, 150);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.src) {
            return nextProps.src;
        }
        if (nextProps.src !== prevState.src || !isClient) {
            return null;
        }

        return {
            src: this.pickOptimalSource(this.node.offsetWidth, nextProps)
        };
    }

    handleResize = () => {
        this.setState({
            src: this.pickOptimalSource(this.node.offsetWidth)
        });
    };

    componentDidMount() {
        const { type } = this.props;
        if (isClient) {
            this.handleResize();
            window.addEventListener('resize', this.handleResizeDebounced);
            if (type === 'image' && this.props.transition) {
                this.node.addEventListener('load', this.onLoad);
            }
        }
    }
    onLoad = () => {
        this.setState({ loaded: true });
    };
    componentWillUnmount() {
        this.setState({ loaded: false });
        if (isClient) {
            window.removeEventListener('resize', this.handleResizeDebounced);
        }
    }

    pickOptimalSource = width => {
        const { sources } = this.props;
        const sortedSources = sources.sort((a, b) => a.maxWidth > b.maxWidth);
        const bestBiggerSource = sortedSources.filter(
            a => a.maxWidth >= width
        )[0];

        const bestSmallerSource = sortedSources.reduce(
            (memo, source) => (source.maxWidth <= width ? source : memo),
            null
        );

        let source = bestBiggerSource || bestSmallerSource;
        if (source) {
            return source.src;
        }

        return this.props.src;
    };

    render() {
        const {
            sources,
            transition,
            type,
            alt,
            children,
            ...otherProps
        } = this.props;

        const { src, loaded } = this.state;

        let style = {};
        if (transition) {
            if (type === 'image') {
                style.transition = 'opacity .2s ease-in-out';
            }
        }
        if (type === 'image') {
            style.opacity = loaded ? 1 : 0;
        } else if (type === 'background-image') {
            style.backgroundSize = '100% 100%';
            if (src) {
                style.backgroundImage = `url('${src}')`;
            }
            if (this.props.width) {
                style.width = this.props.width;
            }
            if (this.props.height) {
                style.height = this.props.height;
            }
        }
        style = { ...style, ...this.props.style };
        return type === 'image' ? (
            <img
                ref={node => (this.node = node)}
                {...otherProps}
                alt={alt}
                src={src}
                style={style}
            />
        ) : (
            <div ref={node => (this.node = node)} {...otherProps} style={style}>
                {children}
            </div>
        );
    }
}
