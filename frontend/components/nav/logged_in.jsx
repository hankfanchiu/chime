var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var Button = ReactBootstrap.Button;

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
      <Nav pullRight>
        <NavItem eventKey={ 1 } onSelect={ this._goToUpload }>
          Upload
        </NavItem>

        <NavItem eventKey={ 2 } onClick={ this._goToUser }>
          <img className="nav-user-avatar"
            src={ this.props.user.avatar_hero } />

          <span className="spacer spacer-small"></span>

          { this.props.user.username }
        </NavItem>

        <NavItem eventKey={ 3 } onClick={ this._goToTracks }>
          <i className="fa fa-music"></i>
        </NavItem>

        <NavItem eventKey={ 4 } onClick={ this._goToPlaylists }>
          <i className="fa fa-list"></i>
        </NavItem>

        <NavItem eventKey={ 5 } onClick={ this._goToSettings }>
          <i className="fa fa-cog"></i>
        </NavItem>

        <Button onClick={ this._logout }>Logout</Button>
      </Nav>
    );
  }
});

module.exports = LoggedIn;
