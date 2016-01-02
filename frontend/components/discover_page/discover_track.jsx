var React = require("react");
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Glyphicon = require("react-bootstrap").Glyphicon;
var Button = require("react-bootstrap").Button;
var SessionActions = require("../../actions/session_actions");
var PlayerActions = require("../../actions/player_actions");
var PlaylistActions = require("../../actions/playlist_actions");
var AddToQueue = require("../utility/add_to_queue");
var AddToPlaylist = require("../utility/add_to_playlist");
var History = require("react-router").History;

var DiscoverTrack = React.createClass({
  mixins: [History],

  addToPlaylist: function () {
    if (this.props.isLoggedIn) {
      this.props.setTrackToAdd(this.props.track);
      PlaylistActions.showCreateModal();

    } else {
      SessionActions.showLoginModal();
    }
  },

  addToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  goToTrack: function () {
    var track = this.props.track;
    var pathname = "/" + track.user.username + "/" + track.slug;

    this.history.pushState(null, pathname);
  },

  goToUserProfile: function () {
    var pathname = "/" + this.props.track.user.username;

    this.history.pushState(null, pathname);
  },

  playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    if (!track) { return <Col />; }

    return (
      <Col xs={ 4 } sm={ 3 } md={ 3 }>
        <div className="discover-track">
          <span className="btn play-button" onClick={ this.playTrack }>
            <Glyphicon glyph="play" className="play-icon"/>
          </span>

          <div className="discover-track-buttons">
            <AddToQueue addToQueue={ this.addToQueue } />
            <AddToPlaylist addToPlaylist={ this.addToPlaylist } />
          </div>

          <Thumbnail src={ track.img_square } alt={ track.title }>
            <span className="username">
              <a className="username username-small"
                onClick={ this.goToUserProfile }>
                { track.user.username }
              </a>
            </span>

            <div className="title-container">
              <span className="title">
                <a className="title title-small" onClick={ this.goToTrack }>
                  { track.title }
                </a>
              </span>
            </div>
          </Thumbnail>
        </div>
      </Col>
    );
  }
});

module.exports = DiscoverTrack;
