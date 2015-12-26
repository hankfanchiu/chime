var React = require("react");
var Navbar = require("react-bootstrap").Navbar;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var Button = require("react-bootstrap").Button;
var SessionStore = require("../../stores/session_store");
var LoggedIn = require("./logged_in");
var LoggedOut = require("./logged_out");
var Search = require("./search/search");

var Navigation = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    return {
      isLoggedIn: SessionStore.isLoggedIn(),
      user: SessionStore.getCurrentUser()
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
    this.props.history.pushState(null, pathname);
  },

  _goToHome: function () {
    this._pushState("/");
  },

  _goToDiscover: function () {
    this._pushState("/discover");
  },

  renderSessionStatus: function () {
    if (this.state.isLoggedIn) {
      return (
        <LoggedIn user={ this.state.user } pushState={ this._pushState } />
      );
    } else {
      return (
        <LoggedOut pushState={ this._pushState } />
      );
    }
  },

  render: function () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand onClick={ this._goToHome }>
            Chime
          </Navbar.Brand>
        </Navbar.Header>

        <Nav>
          <NavItem onClick={ this._goToDiscover }>
            Discover
          </NavItem>

          <Search pushState={ this._pushState } />
        </Nav>

        { this.renderSessionStatus() }
      </Navbar>
    );
  }
});

module.exports = Navigation;
