var React = require('react');
var $ = require('jquery');
var CommentList = require('./CommentList.jsx');
var CommentForm = require('./CommentForm.jsx');

module.exports = React.createClass({
  getInitialState: function() {
    return {comments: this.props.comments};
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.comments;
    comments.push(comment);
    this.setState({comments: comments}, function() {
      this.postComment(comment);
    });
  },
  postComment: function(comment) {
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
  },
  getComments: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
      complete: this.pollForNewComments
    });
  },
  pollForNewComments: function() {
    setTimeout(this.getComments, this.props.pollInterval);
  },
  componentDidMount: function() {
    this.pollForNewComments();
  },
  render: function() {
    return (
      <div>
        <CommentList comments={this.state.comments} />
        <CommentForm url={this.props.url} onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});
