var React = require("react");
var SessionStore = require("../../stores/session_store");
var SessionActions = require("../../actions/session_actions");

var Logout = React.createClass({
  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) {
      this.props.history.pushState(null, "/");
    } else {
      SessionActions.logout();
    }
  },

  componentDidMount: function () {
    this.props.history.pushState(null, "/");
  },

  render: function () {
    return (
      <p>You have been logged out.</p>
    );
  }
});

module.exports = Logout;
