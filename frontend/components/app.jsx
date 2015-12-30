var React = require("react");
var SessionStore = require("../stores/session_store");
var SessionActions = require("../actions/session_actions");
var Nav = require("./nav/nav");
var SignUp = require("./session/sign_up");
var Login = require("./session/login");
var Settings = require("./session/settings");
var UploadModal = require("./upload_modal/upload_modal");
var Player = require("./player/player");
var Audio = require("./audio");

var App = React.createClass({
  componentWillMount: function () {
    var username = SessionStore.getClientUsername();

    if (username) {
      SessionActions.fetchClient(username);
    }
  },

  render: function () {
    return (
      <div className="app">
        <Nav />

        <SignUp />
        <Login />
        <Settings />
        <UploadModal />

        <main>
          { this.props.children }
        </main>

        <footer>
          <Player />
        </footer>

        <Audio />
      </div>
    );
  }
});

module.exports = App;
