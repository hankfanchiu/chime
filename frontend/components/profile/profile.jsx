var React = require("react");
var SessionStore = require("../../stores/session_store");

var Profile = React.createClass({
  getInitialState: function () {
    return { page: this.props.location.pathname };
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
    this.setState({ page: "/profile" });
  },

  _goToTracks: function () {
    this.props.history.pushState(null, "/tracks", {});
    this.setState({ page: "/tracks" });
  },

  _goToPlaylists: function () {
    this.props.history.pushState(null, "/playlists", {});
    this.setState({ page: "/playlists" });
  },

  renderProfileLink: function () {
    if (this.state.page === "/profile") {
      return <span>Profile</span>;
    } else {
      return <span><a onClick={ this._goToProfile }>Profile</a></span>;
    }
  },

  renderTracksLink: function () {
    if (this.state.page === "/tracks") {
      return <span>Tracks</span>;
    } else {
      return <span><a onClick={ this._goToTracks }>Tracks</a></span>;
    }
  },

  renderPlaylistsLink: function () {
    if (this.state.page === "/playlists") {
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
