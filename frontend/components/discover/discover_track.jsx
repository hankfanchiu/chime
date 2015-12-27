var React = require("react");
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
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
      <Col xs={ 3 } sm={ 3 } md={ 3 }>
        <Thumbnail src={ track.img_square }
          alt={ track.title }
          onClick={ this._playTrack }>

          <a onClick={ this._goToUserProfile }>{ track.user.username }</a>

          <h6>
            <a onClick={ this._goToTrack }>{ track.title }</a>
          </h6>

        </Thumbnail>
      </Col>
    );
  }
});

module.exports = DiscoverTrack;
