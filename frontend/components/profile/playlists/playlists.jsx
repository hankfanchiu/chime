var React = require("react");
var SessionStore = require("../../../stores/session_store");
var ProfileStore = require("../../../stores/profile_store");
var ProfileActions = require("../../../actions/profile_actions");
var PlaylistsIndex = require("./playlists_index");

var Playlists = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { playlists: ProfileStore.getPlaylists() };
  },

  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) {
      this.props.history.pushState(null, "/", {});
    }
  },

  componentDidMount: function () {
    this.listenerToken = ProfileStore.addListener(this._onChange);
    ProfileActions.fetchUser(SessionStore.getUserId());
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  playlistsEmpty: function () {
    return this.state.playlists.length === 0;
  },

  renderPlaylistsIndex: function () {
    if (this.playlistsEmpty()) {
      return <p>You have no playlists!</p>;
    } else {
      return <PlaylistsIndex playlists={ this.state.playlists } />;
    }
  },

  render: function () {
    return (
      <div className="row">
        { this.renderPlaylistsIndex() }
      </div>
    );
  }
});

module.exports = Playlists;
