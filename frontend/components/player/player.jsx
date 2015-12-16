var React = require("react");
var PlaybackStore = require("../../stores/playback_store");
var PlaybackActions = require("../../actions/playback_actions");

var Player = React.createClass({
  getInitialState: function () {
    return { track: {} };
  },

  componentDidMount: function () {
    this.listenerToken = PlaybackStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    var track = PlaybackStore.getTrack();
    this.setState({ track: track });

    var audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = track.track_url;
    audioPlayer.load();
    audioPlayer.play();
  },

  render: function () {
    return (
      <div className="player">
        <div className="audio">

          <audio id="audio-player" preload="auto" controls>
            <source src=""></source>

            <p>
              Your browser does not support the <code>audio</code> element.
            </p>
          </audio>

          <p className="audio-player-title">{ this.state.track.title }</p>
        </div>
      </div>
    );
  }
});

module.exports = Player;
