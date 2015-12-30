var React = require("react");
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var SessionActions = require("../../actions/session_actions");
var PlayerActions = require("../../actions/player_actions");
var PlaylistActions = require("../../actions/playlist_actions");
var AddToQueue = require("../utility/add_to_queue");
var AddToPlaylist = require("../utility/add_to_playlist");
var History = require("react-router").History;

var TracksIndexItem = React.createClass({
  mixins: [History],

  _pushState: function (pathname) {
    this.history.pushState(null, pathname);
  },

  playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  addToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  addToPlaylist: function () {
    if (this.props.isLoggedIn) {
      this.props.setTrackToAdd(this.props.track);
      PlaylistActions.showPlaylistModal();
    } else {
      SessionActions.showLogin();
    }
  },

  goToUser: function () {
    var pathname = "/" + this.props.username;

    this._pushState(pathname);
  },

  goToTrack: function () {
    var pathname = "/" + this.props.username + "/" + this.props.track.slug;

    this._pushState(pathname);
  },

  render: function () {
    var track = this.props.track;

    return (
      <ListGroupItem className="track-index-item">
        <Row className="track-index-item">
          <Col xs={ 3 } sm={ 3 } md={ 3 } className="track-image">
            <span className="btn play-button" onClick={ this.playTrack }>
              <Glyphicon glyph="play" className="play-icon"/>
            </span>

            <Image src={ track.img_square } thumbnail />
          </Col>

          <Col xs={ 9 } sm={ 9 } md={ 9 } className="track-info">
            <section className="track-heading">
              <h5 className="username">
                <a className="username" onClick={ this.goToUser }>
                  { track.user.username }
                </a>
              </h5>

              <h3 className="title">
                <a className="title" onClick={ this.goToTrack }>
                  { track.title }
                </a>
              </h3>

              <p className="time">
                Added { track.time_ago }
              </p>
            </section>

            <section className="buttons">
              <AddToQueue addToQueue={ this.addToQueue } />
              <AddToPlaylist addToPlaylist={ this.addToPlaylist } />
            </section>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = TracksIndexItem;
