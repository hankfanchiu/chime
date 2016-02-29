var React = require("react");
var Link = require("react-router").Link;

module.exports = React.createClass({
  render: function () {
    return (
      <figure className={ this.props.name }>
        <Link className={ this.props.name } to="/discover">
          { this.props.children }
        </Link>
      </figure>
    );
  }
});
