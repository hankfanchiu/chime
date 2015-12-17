var React = require("react");

var NavSessionLinks = React.createClass({
  _profile: function () {
    this.props.history.pushState(null, "/profile", {});
  },

  _tracks: function () {
    this.props.history.pushState(null, "/tracks", {});
  },

  _playlists: function () {
    this.props.history.pushState(null, "/playlists", {});
  },

  render: function () {
    return (
      <ul className="nav navbar-nav nav-links">
        <li><a onClick={ this._profile }>Profile</a></li>
        <li><a onClick={ this._tracks }>Tracks</a></li>
        <li><a onClick={ this._playlists }>Playlists</a></li>
      </ul>
    );
  }
});

module.exports = NavSessionLinks;
