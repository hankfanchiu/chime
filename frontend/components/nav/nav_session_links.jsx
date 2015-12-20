var React = require("react");
var ProfileStore = require("../../stores/profile_store");

var NavSessionLinks = React.createClass({
  _goToUserProfile: function () {
    this.props.history.pushState(null, "/profile", {});
  },

  _goToTracks: function () {
    this.props.history.pushState(null, "/tracks", {});
  },

  _goToPlaylists: function () {
    this.props.history.pushState(null, "/playlists", {});
  },

  _goToSettings: function () {
    this.props.history.pushState(null, "/settings", {});
  },

  render: function () {
    return (
      <ul className="nav navbar-nav nav-links">
        <li>
          <a onClick={ this._goToUserProfile }>
            <i className="fa fa-user"></i>
          </a>
        </li>

        <li>
          <a onClick={ this._goToTracks }>
            <i className="fa fa-music"></i>
          </a>
        </li>

        <li>
          <a onClick={ this._goToPlaylists }>
            <i className="fa fa-list"></i>
          </a>
        </li>

        <li>
          <a onClick={ this._goToSettings }>
            <i className="fa fa-cog"></i>
          </a>
        </li>
      </ul>
    );
  }
});

module.exports = NavSessionLinks;
