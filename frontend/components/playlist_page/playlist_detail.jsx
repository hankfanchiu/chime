var React = require("react");
var PlaylistTrack = require("./playlist_track");
var PlaylistingActions = require("../../actions/playlisting_actions");

var PlaylistDetail = React.createClass({
  _deletePlaylisting: function () {
    var data = {
      playlist_id: this.props.playlistId,
      track_id: this.props.track.id
    };

    PlaylistingActions.deletePlaylisting(data);
  },

  renderTracks: function () {
    var tracks = this.props.playlist.tracks;
    var playTrack = this.props.playTrack;

    return tracks.map(function (track, idx) {
      return (
        <PlaylistTrack key={ idx } track={ track }
          playTrack={ playTrack } />
      );
    });
  },

  render: function () {
    var playlist = this.props.playlist;

    if (!playlist) {
      return <div className="row" />;
    }

    return (
      <div className="row">
        <h1>{ playlist.title }</h1>

        { this.renderTracks() }
      </div>
    );
  }
});

module.exports = PlaylistDetail;
