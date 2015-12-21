var React = require("react");
var SessionActions = require("../../actions/session_actions");
var SessionStore = require("../../stores/session_store");
var NavSessionLinks = require("./nav_session_links");
var History = require("react-router").History;

var NavSession = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { isLoggedIn: SessionStore.isLoggedIn() };
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ isLoggedIn: SessionStore.isLoggedIn() });
  },

  _pushState: function (pathname) {
    this.history.pushState(null, pathname);
  },

  loggedIn: function () {
    return (
      <div className="nav navbar-right">
        <NavSessionLinks history={ this.history } />

        <button className="btn btn-default navbar-btn"
          onClick={ this._pushState.bind(null, "/logout") }>Logout</button>
      </div>
    );
  },

  loggedOut: function () {
    return (
      <div className="nav navbar-right">
        <button className="btn btn-default navbar-btn"
          onClick={ this._pushState.bind(null, "/signup") }>Sign Up</button>

        <span> </span>

        <button className="btn btn-default navbar-btn"
          onClick={ this._pushState.bind(null, "/login") }>Login</button>
      </div>
    );
  },

  render: function () {
    return (
      <div className="collapse navbar-collapse">
        { this.state.isLoggedIn ? this.loggedIn() : this.loggedOut() }
      </div>
    );
  }
});

module.exports = NavSession;
