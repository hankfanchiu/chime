var React = require("react");
var PlayerStore = require("../../stores/player_store");
var AudioActions = require("../../actions/audio_actions");

var Audio = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      track: PlayerStore.getTrack(),
      playRequested: PlayerStore.playRequested(),
      pauseRequested: PlayerStore.pauseRequested(),
      seekTo: PlayerStore.getSeekTo(),
      adjustVolumeTo: PlayerStore.getAdjustVolumeTo()
    }
  },

  componentDidMount: function () {
    var addListener = this.refs.audio.addEventListener;

    addListener("playing", this._handlePlaying);
    addListener("pause", this._handlePause);
    addListener("ended", this._handleEnded);
    addListener("timeupdate", this._handleTimeUpdate);
    addListener("volumechange", this._handleVolumeChange);
    addListener("durationchange", this._handleDurationChange);
  },

  componentWillUnmount: function () {
    var removeListener = this.refs.audio.removeEventListener;

    removeListener("playing", this._handlePlaying);
    removeListener("pause", this._handlePause);
    removeListener("ended", this._handleEnded);
    removeListener("timeupdate", this._handleTimeUpdate);
    removeListener("volumechange", this._handleVolumeChange);
    removeListener("durationchange", this._handleDurationChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (this.refs.audio.playbackId !== nextState.track.playbackId) {
      this._setTrack(nextState.track);
    }
  },

  _setTrack: function (track) {
    this.refs.audio.playbackId = track.playbackId;
    this.refs.audio.src = track.track_url;
    this.refs.audio.load();
    this.refs.audio.play();
  },

  _handlePlaying: function (e) {

  },

  _handlePause: function (e) {

  },

  _handleEnded: function (e) {

  },

  _handleTimeUpdate: function (e) {

  },

  _handleVolumeChange: function (e) {

  },

  _handleDurationChange: function (e) {

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
