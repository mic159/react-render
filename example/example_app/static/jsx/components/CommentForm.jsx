import React, {Component} from 'react';

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {author: '', text: ''};
  }

  handleSubmit = e => {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  };

  handleAuthorChange = e => {
    this.setState({author: e.target.value});
  };

  handleTextChange = e => {
    this.setState({text: e.target.value});
  };

  render() {
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
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }
}
