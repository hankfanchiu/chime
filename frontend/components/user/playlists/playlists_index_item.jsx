var React = require("react");
var PlaylistTrack = require("./playlist_track");
var PlayerActions = require("../../../actions/player_actions");

var PlaylistsIndexItem = React.createClass({
  getInitialState: function () {
    return { isExpanded: false };
  },

  _toggle: function () {
    this.setState({ isExpanded: !this.state.isExpanded });
  },

  _playPlaylist: function () {
    PlayerActions.loadPlaylist(this.props.playlist);
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
          <a onClick={ this._playPlaylist }>
            <i className="fa fa-play"></i>
          </a>

          <span>&nbsp;</span>

          { playlist.title }

          <span>:&nbsp;</span>

          { playlist.description }

          <span>&nbsp;|&nbsp;</span>

          <a onClick={ this._toggle }>{ option }</a>
        </p>

        <ul>
          { this.renderPlaylistTracks() }
        </ul>
      </div>
    );
  }
});

module.exports = PlaylistsIndexItem;
