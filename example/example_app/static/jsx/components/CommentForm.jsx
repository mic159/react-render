var React = require('react');

module.exports = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  render: function() {
    return (
      <form method="POST" action={this.props.url} onSubmit={this.handleSubmit}>
        <h2>Submit a comment</h2>
        <div className="form-group">
          <label>
            Your name
            <input
              type="text" className="form-control" name="author"
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Say something...
            <textarea
              className="form-control" name="text"
              value={this.state.text}
              onChange={this.handleTextChange}
            />
          </label>
        </div>
        <div className="text-right">
          <button type="reset" className="btn btn-default">Reset</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
});
