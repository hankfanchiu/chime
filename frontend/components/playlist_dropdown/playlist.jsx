var React = require("react");
var PlaylistingActions = require("../../actions/playlisting_actions");

var Playlist = React.createClass({
  _createPlaylisting: function () {
    var data = {
      playlist_id: this.props.playlist.id,
      track_id: this.props.trackId
    };

    PlaylistingActions.createPlaylisting(data);
  },

  render: function () {
    return (
      <li>
        <a onClick={ this._createPlaylisting }>
          { this.props.playlist.title }
        </a>
      </li>
    );
  }
});

module.exports = Playlist;
