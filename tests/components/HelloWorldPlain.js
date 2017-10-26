var React = require('react');

class HelloWorld extends React.Component {
    static displayName = 'HelloWorld';
    render() {
        return React.createElement("span", null, "Hello ", this.props.name);
    }
}

module.exports = HelloWorld;
