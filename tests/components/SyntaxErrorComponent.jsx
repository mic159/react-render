import React, {PureComponent} from 'react';

class SyntaxErrorComponent extends PureComponent {
  render() {
    return ?+@
  }
}

export default SyntaxErrorComponent;
