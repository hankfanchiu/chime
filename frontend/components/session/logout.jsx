var React = require("react");
var SessionStore = require("../../stores/session_store");
var SessionActions = require("../../actions/session_actions");

module.exports = React.createClass({
  componentWillMount: function () {
    if (SessionStore.isLoggedIn()) {
      SessionActions.logout();
    }
  },

  componentDidMount: function () {
    this.props.history.replaceState(null, "/discover");
  },

  render: function () {
    return <p>You have been logged out.</p>;
  }
});
