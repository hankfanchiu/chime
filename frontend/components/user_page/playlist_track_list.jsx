var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var PlaylistTrack = require("./playlist_track");

module.exports = React.createClass({
  tracks: function () {
    var playlist = this.props.playlist;
    var tracks = playlist.tracks;

    return tracks.map(function (track, idx) {
      return (
        <PlaylistTrack key={ idx }
          index={ idx + 1 }
          track={ track }
          playlistId={ playlist.id } />
      );
    });
  },

  render: function () {
    return (
      <ListGroup>
        { this.tracks() }
      </ListGroup>
    );
  }
});
