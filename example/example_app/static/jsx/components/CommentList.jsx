var React = require('react');
var Comment = require('./Comment.jsx');

module.exports = React.createClass({
  render: function() {
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
});
