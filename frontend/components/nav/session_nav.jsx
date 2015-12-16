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
      <div className="nav navbar-right session-btns">
        <p className="navbar-text">
          Signed in as <a>{ this.props.username }</a>
        </p>

        <button className="btn btn-default navbar-btn"
          onClick={ this._logout }>Logout</button>
      </div>
    );
  },

  loggedOut: function () {
    return (
      <div className="nav navbar-right session-btns">
        <button className="btn btn-default navbar-btn"
          onClick={ this._signUp }>Sign Up</button>

        &nbsp;

        <button className="btn btn-default navbar-btn"
          onClick={ this._login }>Login</button>
      </div>
    );
  },

  render: function () {
    debugger;
    return (
      <div className="session-nav">
        { this.props.isLoggedIn ? this.loggedIn() : this.loggedOut() }
      </div>
    );
  }
});

module.exports = SessionNav;
