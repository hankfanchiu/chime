var React = require("react");
var SessionStore = require("../../stores/session_store");

var Profile = React.createClass({
  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) {
      this.props.history.pushState(null, "/", {});
    }
  },

  render: function () {
    return (
      <div className="container">
        <h1>Profile</h1>

      </div>
    );
  }
});

module.exports = Profile;
