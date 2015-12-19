var React = require("react");
var SessionStore = require("../stores/session_store");
var ProfileActions = require("../actions/profile_actions");
var Nav = require("./nav/nav");
var Player = require("./player/player");

var App = React.createClass({
  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) { return; }

    ProfileActions.fetchUser(SessionStore.getUserId());
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
