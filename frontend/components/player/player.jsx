var React = require("react");
var PlaybackStore = require("../../stores/playback_store");

var Player = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { track: PlaybackStore.getTrack() };
  },

  componentDidMount: function () {
    this.listenerToken = PlaybackStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.state.track.id !== nextState.track.id;
  },

  componentDidUpdate: function () {
    this.refs.audio.load();
    this.refs.audio.play();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  playerStatus: function () {
    if (this.state.track.title) {
      return (
        <div className="status">
          <p className="playing">Currently Playing:</p>
          <p className="title">{ this.state.track.title }</p>
        </div>
      );
    } else {
      return (
        <div className="status"></div>
      );
    }
  },

  render: function () {
    return (
      <div className="player">
        <audio ref="audio" src={ this.state.track.track_url }>
          <p>
            Your browser does not support the <code>audio</code> element.
          </p>
        </audio>

        { this.playerStatus() }
      </div>
    );
  }
});

module.exports = Player;
