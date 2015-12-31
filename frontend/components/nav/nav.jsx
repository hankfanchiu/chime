var React = require("react");
var Navbar = require("react-bootstrap").Navbar;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var SessionStore = require("../../stores/session_store");
var LoggedIn = require("./logged_in");
var LoggedOut = require("./logged_out");
var Search = require("./search/search");
var History = require("react-router").History;

var Navigation = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    return {
      isLoggedIn: SessionStore.isLoggedIn(),
      user: SessionStore.getClient()
    };
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStatesFromStore());
  },

  _pushState: function (pathname) {
    this.history.pushState(null, pathname);
  },

  goToDiscover: function () {
    this._pushState("/discover");
  },

  goToHome: function () {
    this._pushState("/");
  },

  loggedIn: function () {
    return (
      <LoggedIn user={ this.state.user } pushState={ this._pushState } />
    );
  },

  loggedOut: function () {
    return <LoggedOut pushState={ this._pushState } />;
  },

  render: function () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand onClick={ this.goToHome }>
            Chime
          </Navbar.Brand>
        </Navbar.Header>

        <div id="navbar">
          <Nav>
            <NavItem onClick={ this.goToDiscover }>
              Discover
            </NavItem>

            <Search pushState={ this._pushState } />
          </Nav>

          { this.state.isLoggedIn ? this.loggedIn() : this.loggedOut() }
        </div>
      </Navbar>
    );
  }
});

module.exports = Navigation;
