var React = require("react");
var PlayerActions = require("../../../actions/player_actions");
var PlaylistingActions = require("../../../actions/playlisting_actions");

var PlaylistTrack = React.createClass({
  _deletePlaylisting: function () {
    var data = {
      playlist_id: this.props.playlistId,
      track_id: this.props.track.id
    };

    PlaylistingActions.deletePlaylisting(data);
  },

  render: function () {
    var track = this.props.track;

    return (
      <li className="tracks-index-item clear">
        { track.title } | <a onClick={ this._deletePlaylisting }>
          Remove from playlist
        </a>
      </li>
    );
  }
});

module.exports = PlaylistTrack;
