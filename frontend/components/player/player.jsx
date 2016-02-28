var React = require("react");
var Navbar = require("react-bootstrap").Navbar;
var AudioStore = require("../../stores/audio_store");
var PlayerStore = require("../../stores/player_store");
var PlayerActions = require("../../actions/player_actions");
var Controller = require("./controller");
var Timeline = require("./timeline");
var Badge = require("./badge");

var Player = React.createClass({
  getInitialState: function () {
    return this.getStateFromStores();
  },

  getStateFromStores: function () {
    return { isEnded: AudioStore.isEnded() };
  },

  componentDidMount: function () {
    this.listenerToken = AudioStore.addListener(this._onChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.isEnded) {
      setTimeout(PlayerActions.autoPlayNextTrack, 2000);
    }
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStores());
  },

  render: function () {
    if (PlayerStore.queueIsEmpty()) { return <div />; }

    return (
      <Navbar fixedBottom id="player" className="nav-shadow">
        <section className="controller">
          <Controller />
          <Timeline />
          <Badge />
        </section>
      </Navbar>
    );
  }
});

module.exports = Player;
