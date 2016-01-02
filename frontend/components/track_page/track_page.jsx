var React = require("react");
var Grid = require("react-bootstrap").Grid;
var SessionStore = require("../../stores/session_store");
var UserStore = require("../../stores/user_store");
var UserActions = require("../../actions/user_actions");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");
var PlayerActions = require("../../actions/player_actions");
var GiantPlayer = require("./giant_player");
var TrackDetail = require("./track_detail");
var EditTrackModal = require("./edit_track_modal");
var DeleteTrackModal = require("./delete_track_modal");
var PlaylistModal = require("../playlist_modal/playlist_modal");

var TrackPage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var username = this.props.params.username;
    var slug = this.props.params.track;

    return {
      track: TrackStore.find(username, slug),
      user: UserStore.find(username),
      clientUsername: SessionStore.getClientUsername(),
      isLoggedIn: SessionStore.isLoggedIn(),
      isClient: SessionStore.isClient(username)
    };
  },

  componentDidMount: function () {
    var username = this.props.params.username;

    this.userListener = UserStore.addListener(this._onChange);
    this.trackListener = TrackStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);

    UserActions.fetchUser(username);
  },

  componentWillReceiveProps: function (nextProps) {
    var nextUser = nextProps.params.username;
    var nextTrack = nextProps.params.track;

    var sameUser = (this.props.params.username === nextUser);
    var sameTrack = (this.props.params.track === nextTrack);

    if (sameUser && !sameTrack) {
      TrackActions.fetchTrack(nextUser, nextTrack);
    } else if (!sameUser) {
      UserActions.fetchUser(nextUser);
    }
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.trackListener.remove();
    this.sessionListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  goToUser: function () {
    var pathname = "/" + this.state.user.username;

    this.props.history.pushState(null, pathname);
  },

  render: function () {
    return (
      <main>
        <Grid>
          <GiantPlayer track={ this.state.track }
            goToUser={ this.goToUser } />

          <TrackDetail track={ this.state.track }
            user={ this.state.user }
            goToUser={ this.goToUser }
            isLoggedIn={ this.state.isLoggedIn }
            isClient={ this.state.isClient } />

          <PlaylistModal track={ this.state.track }
            clientUsername={ this.state.clientUsername } />

          <EditTrackModal track={ this.state.track } />
          <DeleteTrackModal track={ this.state.track } />
        </Grid>
      </main>
    );
  }
});

module.exports = TrackPage;
