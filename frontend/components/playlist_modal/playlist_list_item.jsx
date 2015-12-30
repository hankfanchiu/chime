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

  add: function () {
    var ids = {
      playlist_id: this.props.playlist.id,
      track_id: this.props.track.id
    };

    this.props.addToPlaylist(ids);
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

  defaultImage: function () {
    var src = "https://s3-us-west-1.amazonaws.com/chime-audio-assets/blue.jpg";

    return (
      <div className="playlist-thumbnail">
        <Image src={ src } thumbnail />
      </div>
    );
  },

  goToPlaylist: function () {
    var username = SessionStore.getClientUsername();
    var slug = this.props.playlist.slug;
    var pathname = "/" + username + "/playlists/" + slug;

    this.props.close();
    this.history.pushState(null, pathname);
  },

  remove: function () {
    var ids = {
      playlist_id: this.props.playlist.id,
      track_id: this.props.track.id
    };

    this.props.removeFromPlaylist(ids);
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

  trackImage: function () {
    var firstTrack = this.props.playlist.tracks[0];

    return (
      <div className="playlist-thumbnail">
        <Image src={ firstTrack.img_thumb } thumbnail />
      </div>
    );
  },

  render: function () {
    var playlist = this.props.playlist;
    var noTracks = (playlist.tracks.length === 0);

    return (
      <ListGroupItem>
        <div className="playlist-list-item">
          { noTracks ? this.defaultImage() : this.trackImage() }

          <section className="playlist-info">
            <header>
              <span className="title">
                { playlist.title }
              </span>
            </header>

            <header>
              <span className="grey-helper-text">
                Tracks: { playlist.tracks.length }
              </span>
            </header>
          </section>

          <div className="button">
            { this._isAdded() ? this.removeButton() : this.addButton() }
          </div>
        </div>
      </ListGroupItem>
    );
  }
});

module.exports = PlaylistListItem;
