var React = require("react");
var Link = require("react-router").Link;
var Navbar = require("react-bootstrap").Navbar;
var LoggedOut = require("./logged_out");

module.exports = React.createClass({
  render: function () {
    return (
      <Navbar className="home-page-nav">
        <Navbar.Header>
          <Link className="nav-logo" to="/">
            Chime
          </Link>
        </Navbar.Header>

        <div id="navbar">
          <LoggedOut />
        </div>
      </Navbar>
    );
  }
});
