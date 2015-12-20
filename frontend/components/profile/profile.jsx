var React = require("react");
var SessionStore = require("../../stores/session_store");

var Profile = React.createClass({
  getInitialState: function () {
    return { path: this.props.location.pathname };
  },

  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) {
      this.props.history.pushState(null, "/", {});
    }
  },

  shouldComponentUpdate: function () {
    return SessionStore.isLoggedIn();
  },

  _goToProfile: function () {
    this.props.history.pushState(null, "/profile", {});
    this.setState({ path: "/profile" });
  },

  _goToTracks: function () {
    this.props.history.pushState(null, "/tracks", {});
    this.setState({ path: "/tracks" });
  },

  _goToPlaylists: function () {
    this.props.history.pushState(null, "/playlists", {});
    this.setState({ path: "/playlists" });
  },

  _goToSettings: function () {
    this.props.history.pushState(null, "/settings", {});
    this.setState({ path: "/settings" });
  },

  renderProfileLink: function () {
    if (this.state.path === "/profile") {
      return <span>Profile</span>;
    } else {
      return <span><a onClick={ this._goToProfile }>Profile</a></span>;
    }
  },

  renderTracksLink: function () {
    if (this.state.path === "/tracks") {
      return <span>Tracks</span>;
    } else {
      return <span><a onClick={ this._goToTracks }>Tracks</a></span>;
    }
  },

  renderPlaylistsLink: function () {
    if (this.state.path === "/playlists") {
      return <span>Playlists</span>;
    } else {
      return <span><a onClick={ this._goToPlaylists }>Playlists</a></span>;
    }
  },

  renderSettingsLink: function () {
    if (this.state.path === "/settings") {
      return <span>Settings</span>;
    } else {
      return <span><a onClick={ this._goToSettings }>Settings</a></span>;
    }
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <h3>
            { this.renderProfileLink() }

            <span className="spacer spacer-large">|</span>

            { this.renderTracksLink() }

            <span className="spacer spacer-large">|</span>

            { this.renderPlaylistsLink() }

            <span className="spacer spacer-large">|</span>

            { this.renderSettingsLink() }
          </h3>
        </div>

        { this.props.children }
      </div>
    );
  }
});

module.exports = Profile;
