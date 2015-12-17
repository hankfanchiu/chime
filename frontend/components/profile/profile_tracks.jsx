var React = require("react");
var SessionStore = require("../../stores/session_store");

var ProfileTracks = React.createClass({
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
