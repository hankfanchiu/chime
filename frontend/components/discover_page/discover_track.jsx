var React = require("react");
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var SessionActions = require("../../actions/session_actions");
var PlayerActions = require("../../actions/player_actions");
var PlaylistActions = require("../../actions/playlist_actions");
var AddToQueue = require("../utility/add_to_queue");
var AddToPlaylist = require("../utility/add_to_playlist");
var RoundPlayButton = require("../utility/round_play_button");
var TrackThumbnail = require("../utility/track_thumbnail");
var History = require("react-router").History;

var DiscoverTrack = React.createClass({
  mixins: [History],

  addToPlaylist: function () {
    if (this.props.isLoggedIn) {
      this.props.setTrackToAdd(this.props.track);
      PlaylistActions.showCreateModal();

    } else {
      SessionActions.showLoginModal();
    }
  },

  addToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  goToTrack: function () {
    var track = this.props.track;
    var pathname = "/" + track.user.username + "/" + track.slug;

    this.history.pushState(null, pathname);
  },

  goToUserProfile: function () {
    var pathname = "/" + this.props.track.user.username;

    this.history.pushState(null, pathname);
  },

  render: function () {
    var track = this.props.track;

    if (!track) { return <Col />; }

    return (
      <Col xs={ 4 } sm={ 3 } md={ 3 }>
        <div className="discover-track">
          <RoundPlayButton track={ track } />

          <div className="discover-track-buttons">
            <AddToQueue addToQueue={ this.addToQueue } />
            <AddToPlaylist addToPlaylist={ this.addToPlaylist } />
          </div>

          <TrackThumbnail track={ track } />
        </div>
      </Col>
    );
  }
});

module.exports = DiscoverTrack;
