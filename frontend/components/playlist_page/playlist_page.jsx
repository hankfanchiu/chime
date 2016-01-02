var React = require("react");
var SessionStore = require("../../stores/session_store");
var UserStore = require("../../stores/user_store");
var UserActions = require("../../actions/user_actions");
var PlaylistStore = require("../../stores/playlist_store");
var PlaylistActions = require("../../actions/playlist_actions");
var PlaylistDetail = require("./playlist_detail");

var PlaylistPage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var username = this.props.params.username;
    var slug = this.props.params.playlist;

    return {
      playlist: PlaylistStore.find(username, slug),
      user: UserStore.find(username),
      clientUsername: SessionStore.getClientUsername(),
      isLoggedIn: SessionStore.isLoggedIn(),
      isClient: SessionStore.isClient(username)
    };
  },

  componentDidMount: function () {
    var username = this.props.params.username;

    this.userListener = UserStore.addListener(this._onChange);
    this.playlistListener = PlaylistStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);

    UserActions.fetchUser(username);
  },

  componentWillReceiveProps: function (nextProps) {
    var nextUser = nextProps.params.username;
    var nextPlaylist = nextProps.params.playlist;

    var sameUser = (this.props.params.username === nextUser);
    var samePlaylist = (this.props.params.playlist === nextPlaylist);

    if (sameUser && !samePlaylist) {
      PlaylistActions.fetchPlaylist(nextUser, nextPlaylist);
    } else if (!sameUser) {
      UserActions.fetchUser(nextUser);
    }
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.playlistListener.remove();
    this.sessionListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _playTrack: function (track) {
    this.setState({ track: track });
  },

  goToUser: function () {
    var pathname = "/" + this.state.user.username;

    this.props.history.pushState(null, pathname);
  },

  render: function () {
    return (
      <main>
        <div className="container">
          <div className="row">
            <PlaylistDetail playlist={ this.state.playlist }
              goToUser={ this.goToUser }
              isLoggedIn={ this.state.isLoggedIn }
              isClient={ this.state.isClient }
              playTrack={ this._playTrack }
              user={ this.state.user } />
          </div>
        </div>
      </main>
    );
  }
});

module.exports = PlaylistPage;
