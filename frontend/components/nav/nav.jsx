var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var Button = ReactBootstrap.Button;

var SessionStore = require("../../stores/session_store");
var LoggedIn = require("./logged_in");
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

  renderSessionStatus: function () {
    if (this.state.isLoggedIn) {
      return (
        <LoggedIn user={ this.state.user } pushState={ this._pushState } />
      );
    } else {
      return (
        <Nav pullRight>
          <Button navItem
            onClick={ this._pushState.bind(null, "/signup") }>
            Sign Up
          </Button>

          <span className="spacer spacer-small"></span>

          <Button navItem
            onClick={ this._pushState.bind(null, "/login") }>
            Login
          </Button>
        </Nav>
      );
    }
  },

  render: function () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a onClick={ this._pushState.bind(null, "/") }>Chime</a>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav>
          <NavItem eventKey={ 1 }
            onSelect={ this._pushState.bind(null, "/discover") }>
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
