var React = require("react");
var SessionStore = require("../stores/session_store");
var SessionActions = require("../actions/session_actions");
var Nav = require("./nav/nav");
var Player = require("./player/player");
var Audio = require("./audio");

var App = React.createClass({
  componentWillMount: function () {
    if (SessionStore.isLoggedIn()) {
      var currentUserId = SessionStore.getCurrentUserId();

      SessionActions.fetchCurrentUser(currentUserId);
    }
  },

  render: function () {
    return (
      <div className="app">
        <Nav history={ this.props.history } />

        <main>
          { this.props.children }
        </main>

        <Audio />

        <footer>
          <Player />
        </footer>
      </div>
    );
  }
});

module.exports = App;
