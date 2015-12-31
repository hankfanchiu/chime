var React = require("react");
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

    return { playlist: PlaylistStore.find(username, slug) };
  },

  componentWillMount: function () {
    var username = this.props.params.username;
    var slug = this.props.params.playlist;

    PlaylistActions.fetchPlaylist(username, slug);
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var nextUser = nextProps.params.username;
    var nextPlaylist = nextProps.params.playlist;

    var sameUser = (this.props.params.username === nextUser);
    var samePlaylist = (this.props.params.playlist === nextPlaylist);

    if (sameUser && samePlaylist) { return; }

    PlaylistActions.fetchPlaylist(nextUser, nextPlaylist);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _playTrack: function (track) {
    this.setState({ track: track });
  },

  render: function () {
    return (
      <main>
        <div className="container">
          <div className="row">


            <PlaylistDetail playlist={ this.state.playlist }
              playTrack={ this._playTrack } />
          </div>
        </div>
      </main>
    );
  }
});

module.exports = PlaylistPage;
