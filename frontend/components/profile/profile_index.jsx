var React = require("react");
var SessionStore = require("../../stores/session_store");

var Profile = React.createClass({
  getInitialState: function () {
    return { page: "Profile" };
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
    this.setState({ page: "Profile" });
  },

  _goToTracks: function () {
    this.props.history.pushState(null, "/tracks", {});
    this.setState({ page: "Tracks" });
  },

  _goToPlaylists: function () {
    this.props.history.pushState(null, "/playlists", {});
    this.setState({ page: "Playlists" });
  },

  renderProfileLink: function () {
    if (this.state.page === "Profile") {
      return <span>Profile</span>;
    } else {
      return <span><a onClick={ this._goToProfile }>Profile</a></span>;
    }
  },

  renderTracksLink: function () {
    if (this.state.page === "Tracks") {
      return <span>Tracks</span>;
    } else {
      return <span><a onClick={ this._goToTracks }>Tracks</a></span>;
    }
  },

  renderPlaylistsLink: function () {
    if (this.state.page === "Playlists") {
      return <span>Playlists</span>;
    } else {
      return <span><a onClick={ this._goToPlaylists }>Playlists</a></span>;
    }
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <h3>
            { this.renderProfileLink() }

            <span style={{ padding: "0 20px 0 20px" }}>|</span>

            { this.renderTracksLink() }

            <span style={{ padding: "0 20px 0 20px" }}>|</span>

            { this.renderPlaylistsLink() }
          </h3>
        </div>

        { this.props.children }
      </div>
    );
  }
});

module.exports = Profile;
