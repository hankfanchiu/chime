var React = require("react");
var PlayerActions = require("../../../actions/player_actions");

var PlaylistTrack = React.createClass({
  _playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    return (
      <li>
        <div className="playlist-track clear" onClick={ this._playTrack }>
          <div className="track-image">
            <img className="track-image" src={ track.img_hero } />
          </div>

          <div className="detail">
            <div className="title">
              { track.user.username } - { track.title }
            </div>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = PlaylistTrack;
