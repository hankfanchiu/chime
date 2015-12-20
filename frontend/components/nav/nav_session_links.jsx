var React = require("react");

var NavSessionLinks = React.createClass({
  _goToProfile: function () {
    this.props.history.pushState(null, "/profile", {});
  },

  _goToSettings: function () {
    this.props.history.pushState(null, "/settings", {});
  },

  render: function () {
    return (
      <ul className="nav navbar-nav nav-links">
        <li><a onClick={ this._goToProfile }>Profile</a></li>
        <li><a onClick={ this._goToSettings }>Settings</a></li>
      </ul>
    );
  }
});

module.exports = NavSessionLinks;
