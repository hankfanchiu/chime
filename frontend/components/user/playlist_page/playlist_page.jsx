var React = require("react");
var PlaylistStore = require("../../../stores/playlist_store");
var PlaylistActions = require("../../../actions/playlist_actions");

var PlaylistPage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var params = this.props.params;
    var identifier = params.user + "-" + params.playlist;

    return { playlist: PlaylistStore.find(identifier) };
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

    var sameUser = (this.props.params.user === nextUser);
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

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <h1>{ this.state.playlist.title }</h1>
        </div>
      </div>
    );
  }
});

module.exports = PlaylistPage;
