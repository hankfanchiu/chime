var React = require("react");
var PlaylistTrack = require("./playlist_track");
var PlayerActions = require("../../../actions/player_actions");
var History = require("react-router").History;

var PlaylistsIndexItem = React.createClass({
  mixins: [History],

  _playPlaylist: function () {
    PlayerActions.loadPlaylist(this.props.playlist);
  },

  _goToPlaylist: function () {
    var username = this.props.username;
    var slug = this.props.playlist.slug;
    var url = "/" + username + "/playlists/" + slug;

    this.history.pushState(null, url);
  },

  renderPlaylistTracks: function () {
    var playlist = this.props.playlist;

    var tracks = playlist.tracks.map(function (track, idx) {
      return (
        <PlaylistTrack key={ idx }
          track={ track } playlistId={ playlist.id }/>
      );
    });

    return tracks;
  },

  render: function () {
    var playlist = this.props.playlist;

    return (
      <div className="playlists-index-item clear">
        <p>
          <a onClick={ this._playPlaylist }>
            <i className="fa fa-play"></i>
          </a>

          <span>&nbsp;</span>

          <a onClick={ this._goToPlaylist }>
            { playlist.title }
          </a>
        </p>

        <ul>
          { this.renderPlaylistTracks() }
        </ul>
      </div>
    );
  }
});

module.exports = PlaylistsIndexItem;
