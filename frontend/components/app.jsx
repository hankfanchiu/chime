var React = require("react");
var SessionActions = require("../actions/session_actions");
var SessionStore = require("../stores/session_store");
var Nav = require("./nav/nav");
var Player = require("./player/player");

var App = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      isLoggedIn: SessionStore.isLoggedIn(),
      username: SessionStore.getUsername()
    };
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <div className="app">
        <Nav isLoggedIn={ this.state.isLoggedIn }
          username={ this.state.username } />

        <main>
          { this.props.children }
        </main>

        <footer>
          <Player />
        </footer>
      </div>
    );
  }
});

module.exports = App;
