var React = require("react");
var SessionStore = require("../../stores/session_store");
var ProfileStore = require("../../stores/profile_store");

var ProfileTracks = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var user = ProfileStore.getProfile();
    user.errors = ProfileStore.getErrors();

    return user;
  },

  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) {
      this.props.history.pushState(null, "/", {});
    }
  },

  render: function () {
    return (
      <div className="container">
        <h1>Tracks</h1>

      </div>
    );
  }
});

module.exports = ProfileTracks;
