var React = require("react");
var PlaylistTrack = require("./playlist_track");

var PlaylistsIndexItem = React.createClass({
  getInitialState: function () {
    return { isExpanded: false };
  },

  _toggle: function (e) {
    this.setState({ isExpanded: !this.state.isExpanded });
  },

  renderPlaylistTracks: function () {
    if (this.state.isExpanded) {
      var playlist = this.props.playlist;
      var tracks = playlist.tracks;

      return tracks.map(function (track, idx) {
        return <PlaylistTrack key={ idx }
          track={ track } playlistId={ playlist.id }/>;
      });
    } else {
      return <div></div>;
    }
  },

  render: function () {
    var playlist = this.props.playlist;
    var option = (this.state.isExpanded ? "Hide Tracks" : "Show Tracks");

    return (
      <div className="playlists-index-item clear">
        <p>
          { playlist.title }: { playlist.description }&nbsp;
          | <a onClick={ this._toggle }>{ option }</a>
        </p>

        { this.renderPlaylistTracks() }
      </div>
    );
  }
});

module.exports = PlaylistsIndexItem;
