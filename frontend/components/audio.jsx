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
    if (this.refs.audio.trackId !== nextState.track.id) {
      this._setTrack(nextState.track);
    }

    if (nextState.pauseRequested) {
      this.refs.audio.pause();
    } else {
      this.refs.audio.play();
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
    var audio = this.refs.audio;

    audio.addEventListener("playing", this._handlePlaying);
    audio.addEventListener("pause", this._handlePause);
    audio.addEventListener("ended", this._handleEnded);
    audio.addEventListener("timeupdate", this._handleTimeUpdate, false);
    audio.addEventListener("volumechange", this._handleVolumeChange, false);
    audio.addEventListener("durationchange", this._handleDurationChange, false);
  },

  _removeAudioEventListeners: function () {
    var audio = this.refs.audio;

    audio.removeEventListener("playing", this._handlePlaying);
    audio.removeEventListener("pause", this._handlePause);
    audio.removeEventListener("ended", this._handleEnded);
    audio.removeEventListener("timeupdate", this._handleTimeUpdate);
    audio.removeEventListener("volumechange", this._handleVolumeChange);
    audio.removeEventListener("durationchange", this._handleDurationChange);
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _setTrack: function (track) {
    this.refs.audio.trackId = track.id;
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
      <audio ref="audio" id="audio">
        <p>Your browser does not support the <code>audio</code> element.</p>
      </audio>
    );
  }
});

module.exports = Audio;
