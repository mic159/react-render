import React, {PureComponent} from 'react';

class HelloWorld extends PureComponent {
  render() {
    return <span>Hello {this.props.name}</span>
  }
}

export default HelloWorld;
