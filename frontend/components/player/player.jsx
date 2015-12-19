var React = require("react");
var PlayerStore = require("../../stores/player_store");
var Audio = require("./audio");
var Controller = require("./controller");

var Player = React.createClass({
  getInitialState: function () {
    return {
      track: PlayerStore.getTrack(),
      isPlaying: false,
      playRequested: false
    };
  },

  componentDidMount: function () {
    this.listenerToken = PlayerStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({
      track: PlayerStore.getTrack(),
      isPlaying: true,
      playRequested: true
    });
  },

  _setIsPlaying: function (isPlaying) {
    this.setState({ isPlaying: isPlaying });
  },

  _setPlayRequest: function (playRequested) {
    this.setState({ playRequested: playRequested });
  },

  render: function () {
    return (
      <div className="player">
        <Audio setIsPlaying={ this._setIsPlaying }
          playRequested={ this.state.playRequested }
          track={ this.state.track}  />

        <Controller setPlayRequest={ this._setPlayRequest }
          isPlaying={ this.state.isPlaying }
          track={ this.state.track } />
      </div>
    );
  }
});

module.exports = Player;
