var React = require("react");
var SessionStore = require("../stores/session_store");
var SessionActions = require("../actions/session_actions");
var Nav = require("./nav/nav");
var UploadModal = require("./upload/upload_modal");
var Player = require("./player/player");
var Audio = require("./audio");

var App = React.createClass({
  getInitialState: function () {
    return { showUploadModal: false };
  },

  _openUpload: function () {
    this.setState({ showUploadModal: true });
  },

  _closeUpload: function () {
    this.setState({ showUploadModal: false });
  },

  componentWillMount: function () {
    if (SessionStore.isLoggedIn()) {
      var currentUserId = SessionStore.getCurrentUserId();

      SessionActions.fetchCurrentUser(currentUserId);
    }
  },

  render: function () {
    return (
      <div className="app">
        <Nav openUpload={ this._openUpload } />

        <main>
          <UploadModal showModal={ this.state.showUploadModal }
            close={ this._closeUpload } />
          
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
