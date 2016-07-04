var React = require('react');
var marked = require('marked');

module.exports = React.createClass({
  render: function() {
    var rawMarkup = marked(this.props.text);
    return (
      <div>
        <h3>
          {this.props.author}
        </h3>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});
