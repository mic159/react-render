import React, {Component} from 'react';
import $ from 'jquery';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';

export default class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: props.comments,
    };
  }

  handleCommentSubmit = comment => {
    var comments = this.state.comments;
    comments.push(comment);
    this.setState({comments: comments}, function() {
      this.postComment(comment);
    });
  };

  postComment = comment => {
    $.ajax({
      url: this.props.url,
      type: 'POST',
      dataType: 'json',
      data: comment,
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  };

  getComments = () => {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
      complete: this.pollForNewComments.bind(this)
    });
  };

  pollForNewComments() {
    setTimeout(this.getComments, this.props.pollInterval);
  }

  componentDidMount() {
    this.pollForNewComments();
  }

  render() {
    return (
      <div>
        <CommentList comments={this.state.comments} />
        <CommentForm url={this.props.url} onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}
