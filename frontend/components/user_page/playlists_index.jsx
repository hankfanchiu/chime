var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var PlaylistStore = require("../../stores/playlist_store");
var PlaylistsIndexItem = require("./playlists_index_item");

var PlaylistsIndex = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    var username = this.props.params.username;
    var playlists = PlaylistStore.getPlaylistsByUsername(username);

    return { playlists: playlists };
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStatesFromStore());
  },

  noPlaylists: function () {
    return (
      <ListGroup>
        <ListGroupItem>
          This user has no playlists! :(
        </ListGroupItem>
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
    var playlistCount = Object.keys(this.state.playlists).length;

    if (playlistCount === 0) { return this.noPlaylists(); }

    return (
      <ListGroup className="playlists-index">
        { this.playlistsIndexItems() }
      </ListGroup>
    );
  }
});

module.exports = PlaylistsIndex;
