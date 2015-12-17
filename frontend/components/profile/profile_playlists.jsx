var React = require("react");
var SessionStore = require("../../stores/session_store");

var ProfilePlaylists = React.createClass({
  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) {
      this.props.history.pushState(null, "/", {});
    }
  },

  render: function () {
    return (
      <div className="container">
        <h1>Playlists</h1>

      </div>
    );
  }
});

module.exports = ProfilePlaylists;
