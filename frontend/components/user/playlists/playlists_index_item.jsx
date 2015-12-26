var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Glyphicon = require("react-bootstrap").Glyphicon;
var Collapse = require("react-bootstrap").Collapse;
var Well = require("react-bootstrap").Well;
var PlayerActions = require("../../../actions/player_actions");
var PlaylistTrack = require("./playlist_track");
var History = require("react-router").History;

var PlaylistsIndexItem = React.createClass({
  mixins: [History],

  _playPlaylist: function () {
    PlayerActions.loadPlaylist(this.props.playlist);
  },

  _goToPlaylist: function () {
    var username = this.props.username;
    var slug = this.props.playlist.slug;
    var pathname = "/" + username + "/playlists/" + slug;

    this.history.pushState(null, pathname);
  },

  renderPlaylistTrackList: function () {
    var playlist = this.props.playlist;

    return playlist.tracks.map(function (track, idx) {
      return (
        <PlaylistTrack key={ idx } index={ idx + 1 }
          track={ track } playlistId={ playlist.id }/>
      );
    });
  },

  render: function () {
    var playlist = this.props.playlist;
    var firstTrackImgUrl = playlist.tracks[0].img_thumb;

    return (
      <ListGroupItem>
        <Row>
          <Col xs={ 3 } sm={ 3 } md={ 3 }>
            <Thumbnail src={ firstTrackImgUrl }
              onClick={ this._playPlaylist } />
          </Col>

          <Col xs={ 9 } sm={ 9 } md={ 9 }>
            <Row>
              <p className="username">
                <a onClick={ this._goToUser }>{ playlist.user.username }</a>
              </p>

              <p className="playlist-title">
                <a onClick={ this._goToPlaylist }>{ playlist.title }</a>
              </p>
            </Row>

            <Row>
              <ListGroup>
                { this.renderPlaylistTrackList() }
              </ListGroup>
            </Row>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = PlaylistsIndexItem;
