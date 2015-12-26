var React = require("react");
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var NavDropdown = require("react-bootstrap").NavDropdown;
var MenuItem = require("react-bootstrap").MenuItem;
var Button = require("react-bootstrap").Button;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var UploadActions = require("../../actions/upload_actions");

var LoggedIn = React.createClass({
  _showUploadModal: function () {
    UploadActions.showModal();
  },

  _goToTracks: function () {
    var tracks = "/" + this.props.user.username + "/tracks";

    this.props.pushState(tracks);
  },

  _goToPlaylists: function () {
    var playlists = "/" + this.props.user.username + "/playlists";

    this.props.pushState(playlists);
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
        <NavItem onClick={ this._showUploadModal }>
          Upload
        </NavItem>

        <NavDropdown id="user-dropdown"
          title={ this.renderDropdownTitle() }>

          <MenuItem onClick={ this._goToTracks }>
            <Glyphicon glyph="music" />
            <span className="spacer spacer-small" />
            Tracks
          </MenuItem>

          <MenuItem onClick={ this._goToPlaylists }>
            <Glyphicon glyph="th-list" />
            <span className="spacer spacer-small" />
            Playlists
          </MenuItem>

          <MenuItem onClick={ this._goToSettings }>
            <Glyphicon glyph="cog" />
            <span className="spacer spacer-small" />
            Settings
          </MenuItem>

          <MenuItem divider />

          <MenuItem onClick={ this._logout }>
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
