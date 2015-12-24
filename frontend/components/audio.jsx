var React = require("react");
var PlayerStore = require("../stores/player_store");
var AudioActions = require("../actions/audio_actions");

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
    this._addAudioEventListeners();
    this.listenerToken = PlayerStore.addListener(this._onChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (this.refs.audio.playbackId !== nextState.track.playbackId) {
      this._setTrack(nextState.track);
    }

    if (nextState.playRequested) {
      this.refs.audio.play();
    } else if (nextState.pauseRequested) {
      this.refs.audio.pause();
    }

    if (nextState.seekTo) {
      this.refs.audio.currentTime = nextState.seekTo;
    }

    if (nextState.adjustVolumeTo) {
      this.refs.audio.volume = nextState.adjustVolumeTo;
    }
  },

  componentWillUnmount: function () {
    this._removeAudioEventListeners();
    this.listenerToken.remove();
  },

  _addAudioEventListeners: function () {
    var addListener = this.refs.audio.addEventListener;

    addListener("playing", this._handlePlaying);
    addListener("pause", this._handlePause);
    addListener("ended", this._handleEnded);
    addListener("timeupdate", this._handleTimeUpdate);
    addListener("volumechange", this._handleVolumeChange);
    addListener("durationchange", this._handleDurationChange);
  },

  _removeAudioEventListeners: function () {
    var removeListener = this.refs.audio.removeEventListener;

    removeListener("playing", this._handlePlaying);
    removeListener("pause", this._handlePause);
    removeListener("ended", this._handleEnded);
    removeListener("timeupdate", this._handleTimeUpdate);
    removeListener("volumechange", this._handleVolumeChange);
    removeListener("durationchange", this._handleDurationChange);
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _setTrack: function (track) {
    this.refs.audio.playbackId = track.playbackId;
    this.refs.audio.src = track.track_url;
    this.refs.audio.load();
    this.refs.audio.play();
  },

  _handlePlaying: function () {
    AudioActions.setToIsPlaying();
  },

  _handlePause: function () {
    AudioActions.setToIsPaused();
  },

  _handleEnded: function () {
    AudioActions.setToIsEnded();
  },

  _handleTimeUpdate: function () {
    var currentTime = this.refs.audio.currentTime;
    AudioActions.setCurrentTime(currentTime);
  },

  _handleVolumeChange: function () {
    var volume = this.refs.audio.volume;
    AudioActions.setVolume(volume);
  },

  _handleDurationChange: function () {
    var duration = this.refs.audio.duration;
    AudioActions.setDuration(duration);
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
