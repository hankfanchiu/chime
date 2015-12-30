var React = require("react");
var Grid = require("react-bootstrap").Grid;
var SessionStore = require("../../../stores/session_store");
var TrackStore = require("../../../stores/track_store");
var TrackActions = require("../../../actions/track_actions");
var GiantPlayer = require("../giant_player/giant_player");
var TrackDetail = require("./track_detail");
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

  render: function () {
    return (
      <Grid>
        <GiantPlayer track={ this.state.track } />

        <TrackDetail track={ this.state.track } />

        <PlaylistModal track={ this.state.trackToAdd }
          clientUsername={ this.state.clientUsername } />
      </Grid>
    );
  }
});

module.exports = TrackPage;
