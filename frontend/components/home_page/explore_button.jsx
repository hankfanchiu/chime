var React = require("react");
var Link = require("react-router").Link;

var ExploreButton = React.createClass({
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

module.exports = ExploreButton;
