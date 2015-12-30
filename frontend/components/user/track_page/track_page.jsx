var React = require("react");
var Grid = require("react-bootstrap").Grid;
var SessionStore = require("../../../stores/session_store");
var SessionActions = require("../../../actions/session_actions");
var TrackStore = require("../../../stores/track_store");
var TrackActions = require("../../../actions/track_actions");
var PlayerActions = require("../../../actions/player_actions");
var PlaylistActions = require("../../../actions/playlist_actions");
var GiantPlayer = require("./giant_player");
var TrackDetail = require("./track_detail");
var AddToQueue = require("../../utility/add_to_queue");
var AddToPlaylist = require("../../utility/add_to_playlist");
var PlaylistModal = require('../../playlist_modal/playlist_modal')

var TrackPage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var username = this.props.params.username;
    var slug = this.props.params.track;

    return {
      track: TrackStore.find(username, slug),
      clientUsername: SessionStore.getClientUsername(),
      isLoggedIn: SessionStore.isLoggedIn()
    };
  },

  componentWillMount: function () {
    var username = this.props.params.username;
    var slug = this.props.params.track;

    TrackActions.fetchTrack(username, slug);
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var nextUser = nextProps.params.username;
    var nextTrack = nextProps.params.track;

    var sameUser = (this.props.params.username === nextUser);
    var sameTrack = (this.props.params.track === nextTrack);

    if (sameUser && sameTrack) { return; }

    TrackActions.fetchTrack(nextUser, nextTrack);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  addToQueue: function () {
    PlayerActions.addTrackToQueue(this.state.track);
  },

  addToPlaylist: function () {
    if (this.state.isLoggedIn) {
      PlaylistActions.showPlaylistModal();
    } else {
      SessionActions.showLogin();
    }
  },

  render: function () {
    return (
      <Grid>
        <GiantPlayer track={ this.state.track } />

        <section className="giant-player-buttons">
          <AddToQueue addToQueue={ this.addToQueue } />
          <AddToPlaylist addToPlaylist={ this.addToPlaylist } />
        </section>

        <TrackDetail track={ this.state.track } />

        <PlaylistModal track={ this.state.track }
          clientUsername={ this.state.clientUsername } />
      </Grid>
    );
  }
});

module.exports = TrackPage;
