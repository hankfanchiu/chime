var React = require("react");
var SessionStore = require("../../stores/session_store");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");
var ProfileActions = require("../../actions/profile_actions");
var SearchIndex = require("./search_index");

var Search = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { tracks: TrackStore.all() };
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
    TrackActions.fetchTracks();

    if (SessionStore.isLoggedIn()) {
      ProfileActions.fetchPlaylists();
    }
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <div className="container search">
        <h1>Search chimes</h1>

        <SearchIndex tracks={ this.state.tracks } />
      </div>
    );
  }
});

module.exports = Search;
