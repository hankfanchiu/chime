var React = require("react");
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Button = require("react-bootstrap").Button;
var SessionStore = require("../../stores/session_store");
var History = require("react-router").History;

var PlaylistListItem = React.createClass({
  mixins: [History],

  _isAdded: function () {
    var playlist = this.props.playlist;
    var trackId = this.props.track.id;
    var foundIndex = -1;

    playlist.tracks.forEach(function (possibleTrack, idx) {
      if (possibleTrack.id === trackId) { foundIndex = idx; }
    });

    return (foundIndex !== -1);
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
    return <Button bsStyle="primary" onClick={ this.add }>Add</Button>;
  },

  removeButton: function () {
    return <Button onClick={ this.remove }>Remove</Button>;
  },

  render: function () {
    var playlist = this.props.playlist;
    var firstTrackImgUrl = playlist.tracks[0].img_thumb;

    return (
      <ListGroupItem>
        <Row>
          <Col xs={ 2 } sm={ 2 } md={ 2 }>
            <Thumbnail src={ firstTrackImgUrl }
              onClick={ this.goToPlaylist } />
          </Col>

          <Col xs={ 7 } sm={ 7 } md={ 7 }>
            <span className="playlist-title">
              <a onClick={ this.goToPlaylist }>{ playlist.title }</a>
            </span>

            <span className="playlist-track-count">
              Tracks: { playlist.track_count }
            </span>
          </Col>

          <Col xs={ 3 } sm={ 3 } md={ 3 } style={{ textAlign: "right" }}>
            { this._isAdded() ? this.removeButton() : this.addButton() }
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = PlaylistListItem;
