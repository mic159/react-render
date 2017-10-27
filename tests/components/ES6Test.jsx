import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

class HelloWorld extends PureComponent {
  render() {
    return <span>Hello {this.props.name}</span>
  }
}

HelloWorld.propTypes = {
    name: PropTypes.string
};

export default HelloWorld;
