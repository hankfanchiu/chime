var React = require("react");
var SessionStore = require("../../../stores/session_store");
var ProfileStore = require("../../../stores/profile_store");
var ProfileActions = require("../../../actions/profile_actions");
var TracksIndex = require("./tracks_index");

var Tracks = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { tracks: ProfileStore.getTracks() };
  },

  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) {
      this.props.history.pushState(null, "/", {});
    }
  },

  componentDidMount: function () {
    this.listenerToken = ProfileStore.addListener(this._onChange);
    ProfileActions.fetchProfile();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  tracksEmpty: function () {
    return this.state.tracks.length === 0;
  },

  renderTracksIndex: function () {
    if (this.tracksEmpty()) {
      return <p>You have no tracks!</p>;
    } else {
      return <TracksIndex tracks={ this.state.tracks } />;
    }
  },

  render: function () {
    return (
      <div className="container">
        <h1>Tracks</h1>

        { this.renderTracksIndex() }
      </div>
    );
  }
});

module.exports = Tracks;
