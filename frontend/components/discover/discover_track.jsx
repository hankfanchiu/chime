var React = require("react");
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Glyphicon = require("react-bootstrap").Glyphicon;
var Button = require("react-bootstrap").Button;
var PlayerActions = require("../../actions/player_actions");
var AddToQueue = require("../utility/add_to_queue");
var AddToPlaylist = require("../utility/add_to_playlist");
var History = require("react-router").History;

var DiscoverTrack = React.createClass({
  mixins: [History],

  _goToTrack: function () {
    var track = this.props.track;
    var pathname = "/" + track.user.username + "/" + track.slug;

    this.history.pushState(null, pathname);
  },

  _goToUserProfile: function () {
    var pathname = "/" + this.props.track.user.username;

    this.history.pushState(null, pathname);
  },

  addToPlaylist: function () {

  },

  addToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
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
              <a onClick={ this._goToUserProfile }>
                { track.user.username }
              </a>
            </span>

            <div className="title-container">
              <span className="title">
                <a onClick={ this._goToTrack }>
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
