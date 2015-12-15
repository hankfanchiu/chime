var React = require("react");

var Root = React.createClass({
  render: function () {
    return (
      <div>
        Hello from Root

        { this.props.children }
      </div>
    );
  }
});

module.exports = Root;
