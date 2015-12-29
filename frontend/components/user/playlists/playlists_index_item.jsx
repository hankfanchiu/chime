var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
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
        <PlaylistTrack key={ idx }
          index={ idx + 1 }
          track={ track }
          playlistId={ playlist.id } />
      );
    });
  },

  render: function () {
    var playlist = this.props.playlist;
    var firstTrack = playlist.tracks[0];

    return (
      <ListGroupItem className="playlist-index-item">
        <Row>
          <Col xs={ 3 } sm={ 3 } md={ 3 } className="playlist-image">
            <span className="btn play-button" onClick={ this._playPlaylist }>
              <Glyphicon glyph="play" className="play-icon"/>
            </span>

            <Image src={ firstTrack.img_square } thumbnail />
          </Col>

          <Col xs={ 9 } sm={ 9 } md={ 9 }>
            <section className="playlist-info">
              <header className="username username-large">
                <a className="username" onClick={ this._goToUser }>
                  { playlist.user.username }
                </a>
              </header>

              <header className="title title-large">
                <a className="title" onClick={ this._goToPlaylist }>
                  { playlist.title }
                </a>
              </header>
            </section>

            <ListGroup>
              { this.renderPlaylistTrackList() }
            </ListGroup>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = PlaylistsIndexItem;
