var React = require("react");
var SessionStore = require("../stores/session_store");
var SessionActions = require("../actions/session_actions");
var Nav = require("./nav/nav");
var HomePageNav = require("./nav/home_page_nav");
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
    var onHomePage = (this.props.location.pathname === "/");

    return (
      <div className="app">
        { onHomePage ? <HomePageNav /> : <Nav /> }

        <SignUp />
        <Login />
        <Settings />
        <UploadModal />

        { this.props.children }

        <footer>
          <Player />
        </footer>

        <Audio />
      </div>
    );
  }
});

module.exports = App;
