var React = require("react");
var AudioStore = require("../../stores/audio_store");
var BackwardButton = require("./backward_button");
var PlayButton = require("./play_button");
var ForwardButton = require("./forward_button");

var Player = React.createClass({
  getInitialState: function () {
    return {
      isPlaying: AudioStore.isPlaying(),
      isPaused: AudioStore.isPaused()
    };
  },

  componentDidMount: function () {
    this.listenerToken = AudioStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  render: function () {
    return (
      <figure className="audio-controller">
        <BackwardButton />

        <PlayButton isPlaying={ this.state.isPlaying }
          isPaused={ this.state.isPaused } />

        <ForwardButton />
      </figure>
    );
  }
});

module.exports = Player;
