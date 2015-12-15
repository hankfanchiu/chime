var React = require("react");
var SessionActions = require("../actions/session_actions");
var SessionStore = require("../stores/session_store");

var App = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      isLoggedIn: SessionStore.isLoggedIn(),
      email: SessionStore.getEmail()
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

  handleSignUp: function (e) {
    e.preventDefault();

    this.props.history.pushState(null, "/signup", {});
  },

  handleLogin: function (e) {
    e.preventDefault();

    this.props.history.pushState(null, "/login", {});
  },

  handleLogout: function (e) {
    e.preventDefault();

    SessionActions.logout();
  },

  render: function () {
    var loggedIn;
    var email;

    if (this.state.isLoggedIn) {
      loggedIn = "LOGGED IN";
      email = this.state.email;
    } else {
      loggedIn = "NOT";
      email = "Not signed in";
    }

    return (
      <div>
        <header><h1>Chime</h1></header>

        Logged In? {loggedIn}<br/>
        Email: {email}<br/>

        <button onClick={ this.handleSignUp }>Sign Up</button>
        <button onClick={ this.handleLogin }>Login</button>
        <button onClick={ this.handleLogout }>Logout</button>

        { this.props.children }
      </div>
    );
  }
});

module.exports = App;
