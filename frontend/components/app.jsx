var React = require("react");
var SessionActions = require("../actions/session_actions");
var SessionStore = require("../stores/session_store");
var Nav = require("./nav/nav");
var Player = require("./player/player");

var App = React.createClass({
  getInitialState: function () {
    return { isLoggedIn: SessionStore.isLoggedIn() };
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ isLoggedIn: SessionStore.isLoggedIn() });
  },

  render: function () {
    return (
      <div className="app">
        <Nav />

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
