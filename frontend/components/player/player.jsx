var React = require("react");
var PlayerActions = require("../../actions/player_actions");
var PlayerStore = require("../../stores/player_store");

var Player = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { track: PlayerStore.getTrack() };
  },

  componentDidMount: function () {
    this.listenerToken = PlayerStore.addListener(this._onChange);
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

  _playNextTrack: function () {
    PlayerActions.playNextTrack();
  },

  _playPreviousTrack: function () {
    PlayerActions.playPreviousTrack();
  },

  playerStatus: function () {
    if (this.state.track.title) {
      return (
        <div className="status">
          <p className="playing">Currently Playing:</p>
          <p className="title">{ this.state.track.title }</p>

          <p>
            <a onClick={ this._playPreviousTrack }>Previous Track</a>&nbsp;
            | <a onClick={ this._playNextTrack }>Next Track</a>
          </p>
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
