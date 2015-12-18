var React = require("react");
var PlayerActions = require("../../actions/player_actions");
var PlayerStore = require("../../stores/player_store");
var Controller = require("./controller");

var Player = React.createClass({
  getInitialState: function () {
    return {
      track: PlayerStore.getTrack(),
      isPlaying: false
    };
  },

  componentDidMount: function () {
    this.listenerToken = PlayerStore.addListener(this._onChange);
    this.refs.audio.addEventListener("ended", this._handleAudioEnd);
    this.refs.audio.addEventListener("playing", this._handlePlaying);
    this.refs.audio.addEventListener("pause", this._handlePause);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
    this.refs.audio.removeEventListener("ended", this._handleAudioEnd);
    this.refs.audio.removeEventListener("playing", this._handlePlaying);
    this.refs.audio.removeEventListener("pause", this._handlePause);
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.state.track.id !== nextState.track.id;
  },

  componentDidUpdate: function () {
    this.refs.audio.load();
    this.refs.audio.play();
  },

  _onChange: function () {
    this.setState({ track: PlayerStore.getTrack() });
  },

  _handleAudioEnd: function () {
    setTimeout(PlayerActions.autoPlayNextTrack, 1000);
  },

  _handlePlaying: function () {
    this.setState({ isPlaying: true });
  },

  _handlePause: function () {
    this.setState({ isPlaying: false });
  },

  togglePlayPause: function () {
    if (this.state.isPlaying) {
      this.refs.audio.pause();
    } else {
      this.refs.audio.play();
    }
  },

  hasTrack: function () {
    return (Object.keys(this.state.track).length !== 0);
  },

  renderController: function () {
    if (this.hasTrack()) {
      return (
        <Controller track={ this.state.track }
          isPlaying={ this.state.isPlaying }
          togglePlayPause={ this.togglePlayPause } />
      );
    } else {
      return (
        <div className="controller"></div>
      );
    }
  },

  render: function () {
    var source = (this.hasTrack() ? this.state.track.track_url : "");

    return (
      <div className="player">
        <audio ref="audio" src={ source }>
          <p>Your browser does not support the <code>audio</code> element.</p>
        </audio>

        { this.renderController() }
      </div>
    );
  }
});

module.exports = Player;
