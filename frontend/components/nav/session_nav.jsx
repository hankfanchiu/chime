var React = require("react");
var SessionActions = require("../../actions/session_actions");
var History = require("react-router").History;

var SessionNav = React.createClass({
  mixins: [History],

  handleSignUp: function (e) {
    this.history.pushState(null, "/signup", {});
  },

  handleLogin: function (e) {
    this.history.pushState(null, "/login", {});
  },

  handleLogout: function (e) {
    SessionActions.logout();
    this.history.pushState(null, "/", {});
  },

  LoggedIn: function () {
    return (
      <ul className="session-links">
        <li>{ this.props.email }</li>
        <li>
          <a onClick={ this.handleLogout }>Logout</a>
        </li>
      </ul>
    );
  },

  LoggedOut: function () {
    return (
      <ul className="session-links">
        <li>
          <a onClick={ this.handleSignUp }>Sign Up</a>
        </li>
        <li>
          <a onClick={ this.handleLogin }>Login</a>
        </li>
      </ul>
    );
  },

  render: function () {
    return (
      <div className="session-nav">
        { this.props.isLoggedIn ? this.LoggedIn() : this.LoggedOut() }
      </div>
    );
  }
});

module.exports = SessionNav;
