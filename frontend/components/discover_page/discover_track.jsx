var React = require("react");
var Col = require("react-bootstrap").Col;
var SessionActions = require("../../actions/session_actions");
var PlaylistActions = require("../../actions/playlist_actions");
var AddToQueue = require("../utility/add_to_queue");
var AddToPlaylist = require("../utility/add_to_playlist");
var RoundPlayButton = require("../utility/round_play_button");
var TrackThumbnail = require("../utility/track_thumbnail");

module.exports = React.createClass({
  addToPlaylist: function () {
    if (this.props.isLoggedIn) {
      this.props.setTrackToAdd(this.props.track);
      PlaylistActions.showCreateModal();

    } else {
      SessionActions.showLoginModal();
    }
  },

  render: function () {
    var track = this.props.track;

    if (!track) { return <Col />; }

    return (
      <Col xs={ 4 } sm={ 3 } md={ 3 }>
        <div className="discover-track">
          <RoundPlayButton track={ track } />

          <div className="discover-track-buttons">
            <AddToQueue track={ track } />
            <AddToPlaylist addToPlaylist={ this.addToPlaylist } />
          </div>

          <TrackThumbnail track={ track } />
        </div>
      </Col>
    );
  }
});
