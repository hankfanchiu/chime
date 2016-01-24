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
    this.listenerToken.remove();
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
    AudioActions.setCurrentTime(this.refs.audio.currentTime);
  },

  _handleVolumeChange: function () {
    AudioActions.setVolume(this.refs.audio.volume);
  },

  _handleDurationChange: function () {
    AudioActions.setDuration(this.refs.audio.duration);
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

module.exports = Audio;
