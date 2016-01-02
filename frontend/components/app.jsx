var React = require("react");
var SessionStore = require("../stores/session_store");
var SessionActions = require("../actions/session_actions");
var Nav = require("./nav/nav");
var HomePageNav = require("./nav/home_page_nav");
var SignUpModal = require("./session/sign_up_modal");
var LoginModal = require("./session/login_modal");
var SettingsModal = require("./session/settings_modal");
var UploadModal = require("./upload_modal/upload_modal");
var Footer = require("./footer/footer");
var Player = require("./player/player");
var Audio = require("./audio");

var App = React.createClass({
  componentDidMount: function () {
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

        <SignUpModal />
        <LoginModal />
        <SettingsModal />
        <UploadModal />

        { this.props.children }

        <Footer />

        <Player />
        <Audio />
      </div>
    );
  }
});

module.exports = App;
