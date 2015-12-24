var React = require("react");

var LoggedIn = React.createClass({
  _goToUpload: function () {
    this.props.pushState("/upload");
  },

  _goToUser: function () {
    var pathname = "/" + this.props.user.username;

    this.props.pushState(pathname);
  },

  _goToTracks: function () {
    var pathname = "/" + this.props.user.username + "/tracks";

    this.props.pushState(pathname);
  },

  _goToPlaylists: function () {
    var pathname = "/" + this.props.user.username + "/playlists";

    this.props.pushState(pathname);
  },

  _goToSettings: function () {
    this.props.pushState("/settings");
  },

  _logout: function () {
    this.props.pushState("/logout");
  },

  render: function () {
    return (
      <div className="nav navbar-right">
        <ul className="nav navbar-nav">
          <li>
            <a onClick={ this._goToUpload }>
              Upload
            </a>
          </li>

          <li>
            <a onClick={ this._goToUser }>
              <img className="nav-user-avatar"
                src={ this.props.user.avatar_hero } />

              <span className="spacer spacer-small"></span>

              { this.props.user.username }
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

        <button className="btn btn-default navbar-btn"
          onClick={ this._logout }>Logout</button>
      </div>
    );
  }
});

module.exports = LoggedIn;
