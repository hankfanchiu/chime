var React = require("react");
var PlayerActions = require("../../actions/player_actions");
var PlayerStore = require("../../stores/player_store");

var Audio = React.createClass({
  componentDidMount: function () {
    this.isPlaying = false;

    this.refs.audio.addEventListener("ended", this._handleEnded);
    this.refs.audio.addEventListener("playing",this._handlePlaying);
    this.refs.audio.addEventListener("pause", this._handlePause);
  },

  componentWillUnmount: function () {
    this.refs.audio.removeEventListener("ended", this._handleEnded);
    this.refs.audio.removeEventListener("playing", this._handlePlaying);
    this.refs.audio.removeEventListener("pause", this._handlePause);
  },

  componentWillReceiveProps: function (nextProps) {
    this._setTrack(nextProps.track);
    this._setPlayback(nextProps.playRequested);
  },

  _setTrack: function (track) {
    if (this.refs.audio.trackId === track.id) { return; }

    this.refs.audio.trackId = track.id;
    this.refs.audio.src = track.track_url;
    this.refs.audio.load();
    this.refs.audio.play();
  },

  _setPlayback: function (playRequested) {
    if (this.props.playRequested === playRequested) { return; }

    playRequested ? this.refs.audio.play() : this.refs.audio.pause();
  },

  _handlePlaying: function () {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.props.setIsPlaying(true);
    }
  },

  _handlePause: function () {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.props.setIsPlaying(false);
    }
  },

  _handleEnded: function () {
    setTimeout(PlayerActions.autoPlayNextTrack, 1000);
  },

  render: function () {
    return (
      <audio ref="audio">
        <p>Your browser does not support the <code>audio</code> element.</p>
      </audio>
    );
  }
});

module.exports = Audio;
