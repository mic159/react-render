import React, {PureComponent} from 'react';

class ErrorThrowingComponent extends PureComponent {
  render() {
    throw Error();
    return null
  }
}

export default ErrorThrowingComponent;
