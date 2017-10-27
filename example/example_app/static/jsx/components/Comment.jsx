import React, {Component} from 'react';
import marked from 'marked';


export default class Comment extends Component {
  render() {
    const rawMarkup = marked(this.props.text);
    return (
      <div>
        <h3>
          {this.props.author}
        </h3>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
}
