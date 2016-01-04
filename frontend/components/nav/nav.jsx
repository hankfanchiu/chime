var React = require("react");
var Navbar = require("react-bootstrap").Navbar;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var SessionStore = require("../../stores/session_store");
var LoggedIn = require("./logged_in");
var LoggedOut = require("./logged_out");
var Search = require("./search");
var History = require("react-router").History;

var Navigation = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
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
    this.setState(this.getStateFromStore());
  },

  goToDiscover: function () {
    this.history.pushState(null, "/discover");
  },

  goToHome: function () {
    this.history.pushState(null, "/");
  },

  loggedIn: function () {
    return <LoggedIn user={ this.state.user } />;
  },

  loggedOut: function () {
    return <LoggedOut />;
  },

  render: function () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <a className="nav-logo" onClick={ this.goToHome }>
            Chime
          </a>
        </Navbar.Header>

        <div id="navbar">
          <Nav>
            <NavItem onClick={ this.goToDiscover }>
              Discover
            </NavItem>

            <Search />
          </Nav>

          { this.state.isLoggedIn ? this.loggedIn() : this.loggedOut() }
        </div>
      </Navbar>
    );
  }
});

module.exports = Navigation;
