var React = require("react");
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Image = require("react-bootstrap").Image;
var Button = require("react-bootstrap").Button;
var SessionStore = require("../../stores/session_store");
var History = require("react-router").History;

var PlaylistListItem = React.createClass({
  mixins: [History],

  _disabled: function () {
    var tracks = this.props.playlist.tracks;

    return (tracks.length === 1);
  },

  _isAdded: function () {
    var tracks = this.props.playlist.tracks;
    var trackId = this.props.track.id;

    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i].id === trackId) { return true; }
    }

    return false;
  },

  goToPlaylist: function () {
    var username = SessionStore.getClientUsername();
    var slug = this.props.playlist.slug;
    var pathname = "/" + username + "/playlists/" + slug;

    this.props.close();
    this.history.pushState(null, pathname);
  },

  add: function () {
    var ids = {
      playlist_id: this.props.playlist.id,
      track_id: this.props.track.id
    };

    this.props.addToPlaylist(ids);
  },

  remove: function () {
    var ids = {
      playlist_id: this.props.playlist.id,
      track_id: this.props.track.id
    };

    this.props.removeFromPlaylist(ids);
  },

  addButton: function () {
    return (
      <Button bsSize="small"
        bsStyle="primary"
        onClick={ this.add }>
        Add
      </Button>
    );
  },

  removeButton: function () {
    return (
      <Button bsSize="small"
        disabled={ this._disabled() }
        onClick={ this.remove }>
        Remove
      </Button>
    );
  },

  render: function () {
    var playlist = this.props.playlist;
    var firstTrack = playlist.tracks[0];

    return (
      <ListGroupItem>
        <div className="playlist-list-item">
          <div className="playlist-thumbnail">
            <Image src={ firstTrack.img_thumb } thumbnail />
          </div>

          <div className="playlist-info">
            <div className="playlist-title">
              <span className="title">
                { playlist.title }
              </span>
            </div>

            <div className="playlist-track-count">
              <span className="grey-helper-text">
                Tracks: { playlist.tracks.length }
              </span>
            </div>
          </div>

          <div className="button">
            { this._isAdded() ? this.removeButton() : this.addButton() }
          </div>
        </div>
      </ListGroupItem>
    );
  }
});

module.exports = PlaylistListItem;
