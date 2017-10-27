import React, {PureComponent} from 'react';
import HelloWorld from './HelloWorld.jsx'

class PerfTestComponent extends PureComponent {
  render() {
    return <HelloWorld name={this.props.name} />
  }
}

export default PerfTestComponent;
