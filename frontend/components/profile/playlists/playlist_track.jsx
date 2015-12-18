var React = require("react");
var PlayerActions = require("../../../actions/player_actions");
var PlaylistingActions = require("../../../actions/playlisting_actions");

var PlaylistTrack = React.createClass({
  _playTrack: function (e) {
    PlayerActions.playTrack(this.props.track);
  },

  _deletePlaylisting: function () {
    var playlistId = this.props.playlistId;
    var trackId = this.props.track.id;

    PlaylistingActions.deletePlaylisting(playlistId, trackId);
  },

  render: function () {
    var track = this.props.track;

    return (
      <div className="tracks-index-item clear">
        <div className="image" onClick={ this._playTrack }>
          <img src={ track.img_url } />
        </div>

        <div className="detail">

          <p className="title">
            { track.title }
          </p>

          <p>
            <a onClick={ this._deletePlaylisting }>
              ( - ) Remove from playlist
            </a>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = PlaylistTrack;
