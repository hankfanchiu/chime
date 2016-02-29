var React = require("react");
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var NavDropdown = require("react-bootstrap").NavDropdown;
var MenuItem = require("react-bootstrap").MenuItem;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var UploadActions = require("../../actions/upload_actions");
var UserActions = require("../../actions/user_actions");
var History = require("react-router").History;

module.exports = React.createClass({
  mixins: [History],

  goToPlaylists: function () {
    var pathname = "/" + this.props.user.username + "/playlists";

    this.history.pushState(null, pathname);
  },

  goToTracks: function () {
    var pathname = "/" + this.props.user.username + "/tracks";

    this.history.pushState(null, pathname);
  },

  logout: function () {
    this.history.pushState(null, "/logout");
  },

  dropdownTitle: function () {
    var style = { margin: "-5px 0 -5px 0", width: "20px", height: "20px" };

    return (
      <span>
        <Image src={ this.props.user.avatar_hero } style={ style } />

        <span className="spacer spacer-small"></span>

        { this.props.user.username }
      </span>
    );
  },

  render: function () {
    return (
      <Nav pullRight>
        <NavItem onClick={ UploadActions.showUpload }>
          Upload
        </NavItem>

        <NavDropdown id="user-dropdown"
          title={ this.dropdownTitle() }>

          <MenuItem onClick={ this.goToTracks }>
            <Glyphicon glyph="music" />
            <span className="spacer spacer-small" />
            Tracks
          </MenuItem>

          <MenuItem onClick={ this.goToPlaylists }>
            <Glyphicon glyph="th-list" />
            <span className="spacer spacer-small" />
            Playlists
          </MenuItem>

          <MenuItem onClick={ UserActions.showSettingsModal }>
            <Glyphicon glyph="cog" />
            <span className="spacer spacer-small" />
            Settings
          </MenuItem>

          <MenuItem divider />

          <MenuItem onClick={ this.logout }>
            <Glyphicon glyph="log-out" />
            <span className="spacer spacer-small" />
            Logout
          </MenuItem>

        </NavDropdown>
      </Nav>
    );
  }
});
