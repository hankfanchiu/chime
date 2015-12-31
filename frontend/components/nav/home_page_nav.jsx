var React = require("react");
var Navbar = require("react-bootstrap").Navbar;
var Nav = require("react-bootstrap").Nav;
var LoggedOut = require("./logged_out");
var History = require("react-router").History;

var Navigation = React.createClass({
  mixins: [History],

  _pushState: function (pathname) {
    this.history.pushState(null, pathname);
  },

  goToHome: function () {
    this._pushState("/");
  },

  render: function () {
    return (
      <Navbar className="home-page-nav nav-shadow">
        <Navbar.Header>
          <Navbar.Brand onClick={ this.goToHome }>
            Chime
          </Navbar.Brand>
        </Navbar.Header>

        <div id="navbar">
          <LoggedOut pushState={ this._pushState } />
        </div>
      </Navbar>
    );
  }
});

module.exports = Navigation;
