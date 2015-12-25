var React = require("react");
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var NavDropdown = require("react-bootstrap").NavDropdown;
var MenuItem = require("react-bootstrap").MenuItem;
var Button = require("react-bootstrap").Button;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;

var LoggedIn = React.createClass({
  _goToUpload: function () {
    this.props.pushState("/upload");
  },

  _goToUserProfile: function () {
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

  renderDropdownTitle: function () {
    return (
      <span>
        <Image src={ this.props.user.avatar_hero }
          style={{ margin: "-5px 0 -5px 0" }} />
        <span className="spacer spacer-small"></span>
        { this.props.user.username }
      </span>
    );
  },

  render: function () {
    if (!this.props.user.username) { return <Nav />; }

    return (
      <Nav pullRight>
        <NavItem eventKey={ 1 } onSelect={ this._goToUpload }>
          Upload
        </NavItem>

        <NavDropdown eventKey={ 2 }
          title={ this.renderDropdownTitle() }
          id="basic-nav-dropdown">

          <MenuItem eventKey={ 2.1 } onClick={ this._goToUserProfile }>
            <Glyphicon glyph="user" />
            <span className="spacer spacer-small" />
            User Profile
          </MenuItem>

          <MenuItem eventKey={ 2.2 } onClick={ this._goToTracks }>
            <Glyphicon glyph="music" />
            <span className="spacer spacer-small" />
            Tracks
          </MenuItem>

          <MenuItem eventKey={ 2.3 } onClick={ this._goToPlaylists }>
            <Glyphicon glyph="th-list" />
            <span className="spacer spacer-small" />
            Playlists
          </MenuItem>

          <MenuItem eventKey={ 2.4 } onClick={ this._goToSettings }>
            <Glyphicon glyph="cog" />
            <span className="spacer spacer-small" />
            Settings
          </MenuItem>

          <MenuItem divider />

          <MenuItem eventKey={ 3 } onSelect={ this._logout }>
            <Glyphicon glyph="log-out" />
            <span className="spacer spacer-small" />
            Logout
          </MenuItem>

        </NavDropdown>
      </Nav>
    );
  }
});

module.exports = LoggedIn;
