import React, {Component} from 'react';
import Comment from './Comment.jsx';


export default class CommentList extends Component {
  render() {
    if (!this.props.comments.length) {
      return null;
    }
    var commentNodes = this.props.comments.map(function(comment, index) {
      return (<Comment author={comment.author} text={comment.text} key={index} />);
    });
    return (
      <div>
        <h2>Comments</h2>
        {commentNodes}
      </div>
    );
  }
}
