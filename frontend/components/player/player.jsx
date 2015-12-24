var React = require("react");
var AudioStore = require("../../stores/audio_store");
var PlayerStore = require("../../stores/player_store");
var PlayerActions = require("../../actions/player_actions");

var BackwardButton = require("./backward_button");
var PlayButton = require("./play_button");
var ForwardButton = require("./forward_button");
var ProgressBar = require("./progress_bar");
var VolumeBar = require("./volume_bar");
var TimeLabel = require("./time_label");

var Player = React.createClass({
  getInitialState: function () {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return {
      track: PlayerStore.getTrack(),
      isPlaying: AudioStore.isPlaying(),
      isPaused: AudioStore.isPaused(),
      isEnded: AudioStore.isEnded(),
      currentTime: AudioStore.getCurrentTime(),
      volume: AudioStore.getVolume(),
      duration: AudioStore.getDuration()
    };
  },

  componentDidMount: function () {
    this.audioToken = AudioStore.addListener(this._onChange);
    this.playerToken = PlayerStore.addListener(this._onChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.isEnded) {
      setTimeout(PlayerActions.autoPlayNextTrack, 2000);
    }
  },

  componentWillUnmount: function () {
    this.audioToken.remove();
    this.playerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStores());
  },

  _playAudio: function () {
    PlayerActions.playAudio();
  },

  _pauseAudio: function () {
    PlayerActions.pauseAudio();
  },

  _playNextTrack: function () {
    PlayerActions.playNextTrack();
  },

  _playPreviousTrack: function () {
    PlayerActions.playPreviousTrack();
  },

  _seekTo: function (time) {
    PlayerActions.seekTo(time);
  },

  _adjustVolumeTo: function (volume) {
    PlayerActions.adjustVolumeTo(volume);
  },

  render: function () {
    if (PlayerStore.queueIsEmpty()) { return <div />; }

    return (
      <div className="player">
        <div className="controller">
          <TimeLabel currentTime={ this.state.currentTime }
            duration={ this.state.duration } />
          <p>
            <span className="title">
              { this.state.track.title }
            </span>
          </p>

          <div className="controller-buttons">
            <BackwardButton playPreviousTrack={ this._playPreviousTrack }/>

            <PlayButton playAudio={ this._playAudio }
              pauseAudio={ this._pauseAudio }
              isPlaying={ this.state.isPlaying }
              isPaused={ this.state.isPaused } />

            <ForwardButton playNextTrack={ this._playNextTrack }/>

            <ProgressBar seekTo={ this._seekTo }
              currentTime={ this.state.currentTime }
              duration={ this.state.duration } />

            <VolumeBar adjustVolumeTo={ this._adjustVolumeTo }
              volume={ this.state.volume } />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Player;
