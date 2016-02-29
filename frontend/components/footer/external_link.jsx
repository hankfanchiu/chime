var React = require("react");

module.exports = React.createClass({
  render: function () {
    return (
      <li>
        <a target="_blank" href={ this.props.href }>
          { this.props.name }
        </a>
      </li>
    );
  }
});
