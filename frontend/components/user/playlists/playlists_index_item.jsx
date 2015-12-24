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
    var pathname = "/" + username + "/playlists/" + slug;

    this.history.pushState(null, pathname);
  },

  renderPlaylistTrackList: function () {
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
    var firstTrackImgUrl = playlist.tracks[0].img_thumb;

    return (
      <div className="playlists-index-item clear">
        <div className="playlist-image" onClick={ this._playPlaylist }>
          <img className="playlist-image" src={ firstTrackImgUrl } />
        </div>

        <div className="playlist-detail">
          <p className="username">
            <a onClick={ this._goToUser }>{ playlist.user.username }</a>
          </p>

          <p className="playlist-title">
            <a onClick={ this._goToPlaylist }>{ playlist.title }</a>
          </p>

          <ul className="playlist-track-list">
            { this.renderPlaylistTrackList() }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = PlaylistsIndexItem;
