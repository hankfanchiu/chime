var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var SessionStore = require("../../stores/session_store");
var PlaylistStore = require("../../stores/playlist_store");
var PlaylistActions = require("../../actions/playlist_actions");
var PlaylistsIndexItem = require("./playlists_index_item");

var PlaylistsIndex = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var username = this.props.params.username;

    return {
      playlists: PlaylistStore.getPlaylistsByUsername(username),
      clientUsername: SessionStore.getClientUsername(),
      isLoggedIn: SessionStore.isLoggedIn(),
      isClient: SessionStore.isClient(username)
    };
  },

  componentDidMount: function () {
    this.playlistListener = PlaylistStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);

    PlaylistActions.fetchPlaylists(this.props.params.username);
  },

  componentWillReceiveProps: function (nextProps) {
    var nextUser = nextProps.params.username;
    var sameUser = (this.props.params.username === nextUser);

    if (!sameUser) {
      PlaylistActions.fetchPlaylists(nextUser);
    }
  },

  componentWillUnmount: function () {
    this.playlistListener.remove();
    this.sessionListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  noPlaylists: function () {
    return (
      <ListGroup>
        <ListGroupItem>This user has no playlists! :(</ListGroupItem>
      </ListGroup>
    );
  },

  playlistsIndexItems: function () {
    var playlistsIndexItems = [];
    var indexItem, playlist;

    Object.keys(this.state.playlists).forEach(function (slug) {
      playlist = this.state.playlists[slug];
      indexItem = (
        <PlaylistsIndexItem key={ playlist.id }
          playlist={ playlist }
          username={ this.props.params.username } />
      );

      playlistsIndexItems.push(indexItem);
    }.bind(this));

    return playlistsIndexItems;
  },

  render: function () {
    if (!this.state.playlists) { return this.noPlaylists(); }

    return (
      <ListGroup className="playlists-index">
        { this.playlistsIndexItems() }
      </ListGroup>
    );
  }
});

module.exports = PlaylistsIndex;
