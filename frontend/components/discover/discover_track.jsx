var React = require("react");
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Glyphicon = require("react-bootstrap").Glyphicon;
var PlayerActions = require("../../actions/player_actions");
var History = require("react-router").History;

var DiscoverTrack = React.createClass({
  mixins: [History],

  _playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  _goToTrack: function () {
    var track = this.props.track;
    var pathname = "/" + track.user.username + "/" + track.slug;

    this.history.pushState(null, pathname);
  },

  _goToUserProfile: function () {
    var pathname = "/" + this.props.track.user.username;

    this.history.pushState(null, pathname);
  },

  render: function () {
    var track = this.props.track;

    if (!track) { return <Col />; }

    return (
      <Col xs={ 4 } sm={ 4 } md={ 3 }>
        <div className="discover-track">
          <span className="play-button" onClick={ this._playTrack }>
            <Glyphicon glyph="play" className="play-icon"/>
          </span>

          <Thumbnail src={ track.img_square }
            alt={ track.title }>

            <span className="username">
              <a onClick={ this._goToUserProfile }>
                { track.user.username }
              </a>
            </span>

            <span className="title">
              <a onClick={ this._goToTrack }>
                { track.title }
              </a>
            </span>

          </Thumbnail>
        </div>
      </Col>
    );
  }
});

module.exports = DiscoverTrack;
