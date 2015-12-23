var React = require("react");
var PlaylistStore = require("../../../stores/playlist_store");
var PlaylistActions = require("../../../actions/playlist_actions");

var PlaylistPage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var params = this.props.params;
    var playlistIdentifier = params.user + "-" + params.playlist;

    return { playlist: PlaylistStore.find(playlistIdentifier) };
  },

  componentWillMount: function () {
    var user = this.props.params.user;
    var playlist = this.props.params.playlist;

    PlaylistActions.fetchPlaylist(user, playlist);
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var nextUser = nextProps.params.user;
    var nextPlaylist = nextProps.params.playlist;

    if (this.props.params.playlist !== nextPlaylist) {
      PlaylistActions.fetchPlaylist(nextUser, nextPlaylist);
    }
  },

  render: function () {
    return (
      <div className="row">
        Playlist Page
      </div>
    );
  }
});

module.exports = PlaylistPage;
