var React = require("react");
var History = require("react-router").History;

var UserNav = React.createClass({
  mixins: [History],

  _pushState: function (pathname) {
    this.history.pushState(null, pathname);
  },

  renderProfileLink: function () {
    var pathname = "/" + this.props.username;

    if (this.props.pathname === pathname) {
      return <span>Profile</span>;
    } else {
      return (
        <span>
          <a onClick={ this._pushState.bind(null, pathname) }>
            Profile
          </a>
        </span>
      );
    }
  },

  renderTracksLink: function () {
    var pathname = "/" + this.props.username + "/tracks";

    if (this.props.pathname === pathname) {
      return <span>Tracks</span>;
    } else {
      return (
        <span>
          <a onClick={ this._pushState.bind(null, pathname) }>
            Tracks
          </a>
        </span>
      );
    }
  },

  renderPlaylistsLink: function () {
    var pathname = "/" + this.props.username + "/playlists";

    if (this.props.pathname === pathname) {
      return <span>Playlists</span>;
    } else {
      return (
        <span>
          <a onClick={ this._pushState.bind(null, pathname) }>
            Playlists
          </a>
        </span>
      );
    }
  },

  render: function () {
    return (
      <div className="row">
        <h4>
          { this.renderProfileLink() }

          <span className="spacer spacer-large"></span>

          { this.renderTracksLink() }

          <span className="spacer spacer-large"></span>

          { this.renderPlaylistsLink() }
        </h4>
      </div>
    );
  }
});

module.exports = UserNav;
