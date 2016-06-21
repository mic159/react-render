import React, {Component, PropTypes} from 'react';

export default class HelloWorld extends Component {
    render() {
        return <span>Hello {this.props.name}</span>;
    }
};

HelloWorld.propTypes = {
    name: PropTypes.string
};
