var React = require("react");
var PlaylistTrack = require("./playlist_track");
var PlayerActions = require("../../../actions/player_actions");
var History = require("react-router").History;

var PlaylistsIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { isExpanded: false };
  },

  _toggle: function () {
    this.setState({ isExpanded: !this.state.isExpanded });
  },

  _playPlaylist: function () {
    PlayerActions.loadPlaylist(this.props.playlist);
  },

  _goToPlaylist: function () {
    var username = this.props.user.username;
    var slug = this.props.playlist.slug;
    var url = "/" + username + "/sets/" + slug;

    this.history.pushState(null, url);
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

          <a onClick={ this._goToPlaylist }>
            { playlist.title }
          </a>

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
