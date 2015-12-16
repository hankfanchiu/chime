var React = require("react");
var SessionActions = require("../../actions/session_actions");
var History = require("react-router").History;

var SessionNav = React.createClass({
  mixins: [History],

  _signUp: function (e) {
    this.history.pushState(null, "/signup", {});
  },

  _login: function (e) {
    this.history.pushState(null, "/login", {});
  },

  _logout: function (e) {
    SessionActions.logout();
    this.history.pushState(null, "/", {});
  },

  loggedIn: function () {
    return (
      <ul className="nav navbar-nav navbar-right session-links">
        <li><a>{ this.props.email }</a></li>
        <li><a onClick={ this._logout }>Logout</a></li>
      </ul>
    );
  },

  loggedOut: function () {
    return (
      <ul className="nav navbar-nav navbar-right session-links">
        <li><a onClick={ this._signUp }>Sign Up</a></li>
        <li><a onClick={ this._login }>Login</a></li>
      </ul>
    );
  },

  render: function () {
    return (
      <div className="session-nav">
        { this.props.isLoggedIn ? this.loggedIn() : this.loggedOut() }
      </div>
    );
  }
});

module.exports = SessionNav;
