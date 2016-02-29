var React = require("react");
var PlayerStore = require("../stores/player_store");
var PlayerActions = require("../actions/player_actions");
var AudioActions = require("../actions/audio_actions");

module.exports = React.createClass({
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
    this.listenerToken = PlayerStore.addListener(this._onChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    this._handleNextTrack(nextState.track);
    this._handlePlayRequested(nextState.playRequested);
    this._handlePauseRequested(nextState.pauseRequested);
    this._handleSeekTo(nextState.seekTo);
    this._handleAdjustVolumeTo(nextState.adjustVolumeTo);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _handleNextTrack: function (track) {
    if (this.refs.audio.trackId !== track.id) {
      this._setTrack(track);
    }
  },

  _handlePlayRequested: function (playRequested) {
    if (playRequested) {
      this.refs.audio.play();
      PlayerActions.resetRequests();
    }
  },

  _handlePauseRequested: function (pauseRequested) {
    if (pauseRequested) {
      audio.pause();
      PlayerActions.resetRequests();
    }
  },

  _handleSeekTo: function (seekTo) {
    if (seekTo) {
      this.refs.audio.currentTime = seekTo;
      PlayerActions.resetRequests();
    }
  },

  _handleAdjustVolumeTo: function (adjustVolumeTo) {
    if (adjustVolumeTo) {
      this.refs.audio.volume = adjustVolumeTo;
      PlayerActions.resetRequests();
    }
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
    AudioActions.setCurrentTime(this.refs.audio.currentTime);
  },

  _handleVolumeChange: function () {
    AudioActions.setVolume(this.refs.audio.volume);
  },

  _handleDurationChange: function () {
    AudioActions.setDuration(this.refs.audio.duration);
  },

  _setTrack: function (track) {
    var audio = this.refs.audio;

    audio.trackId = track.id;
    audio.src = track.track_url;
    audio.load();
    audio.play();
  },

  render: function () {
    return (
      <audio ref="audio"
        id="audio"
        onPlaying={ this._handlePlaying }
        onPause={ this._handlePause }
        onEnded={ this._handleEnded }
        onTimeUpdate={ this._handleTimeUpdate }
        onVolumeChange={ this._handleVolumeChange }
        onDurationChange={ this._handleDurationChange }>

        <p>Your browser does not support the <code>audio</code> element.</p>
      </audio>
    );
  }
});
