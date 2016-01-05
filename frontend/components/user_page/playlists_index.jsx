var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var SessionStore = require("../../stores/session_store");
var PlaylistStore = require("../../stores/playlist_store");
var PlaylistActions = require("../../actions/playlist_actions");
var PlaylistsIndexItem = require("./playlists_index_item");
var EditPlaylistModal = require("./edit_playlist_modal");
var DeletePlaylistModal = require("./delete_playlist_modal");

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

  componentWillUnmount: function () {
    this.playlistListener.remove();
    this.sessionListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _setPlaylistToEdit: function (playlist) {
    this.setState({ playlistToEdit: playlist });
  },

  _setPlaylistToDelete: function (playlist) {
    this.setState({ playlistToDelete: playlist });
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
          username={ this.props.params.username }
          setPlaylistToDelete={ this._setPlaylistToDelete }
          setPlaylistToEdit={ this._setPlaylistToEdit }
          isClient={ this.state.isClient } />
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

        <EditPlaylistModal playlist={ this.state.playlistToEdit } />

        <DeletePlaylistModal playlist={ this.state.playlistToDelete } />
      </ListGroup>
    );
  }
});

module.exports = PlaylistsIndex;
