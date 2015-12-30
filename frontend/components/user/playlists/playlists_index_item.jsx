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

  goToPlaylist: function () {
    var username = this.props.username;
    var slug = this.props.playlist.slug;
    var pathname = "/" + username + "/playlists/" + slug;

    this.history.pushState(null, pathname);
  },

  goToUser: function () {
    var pathname = "/" + this.props.username;

    this.history.pushState(null, pathname);
  },

  playPlaylist: function () {
    PlayerActions.loadPlaylist(this.props.playlist);
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
            <span className="btn play-button" onClick={ this.playPlaylist }>
              <Glyphicon glyph="play" className="play-icon"/>
            </span>

            <Image src={ firstTrack.img_square } thumbnail />
          </Col>

          <Col xs={ 9 } sm={ 9 } md={ 9 }>
            <section className="playlist-info">
              <h5 className="username">
                <a className="username" onClick={ this.goToUser }>
                  { playlist.user.username }
                </a>
              </h5>

              <h3 className="title">
                <a className="title" onClick={ this.goToPlaylist }>
                  { playlist.title }
                </a>
              </h3>

              <p className="time">
                Created { playlist.time_ago }
              </p>
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
