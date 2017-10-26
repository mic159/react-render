import React, {PureComponent} from 'react';
import HelloWorld from './HelloWorld.jsx'

class HelloWorldWrapper extends PureComponent {
  render() {
    const numbers = this.props.numbers.map(function(number) {
      return number * 10;
    }).join(', ')

    return (
      <div>
        <HelloWorld name={this.props.name} />
        <span>{numbers}</span>
      </div>
    )
  }
}

export default HelloWorldWrapper;
