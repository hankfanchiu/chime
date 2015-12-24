var React = require("react");
var SessionStore = require("../../stores/session_store");
var LoggedIn = require("./logged_in");
var Search = require("./search/search");

var Nav = React.createClass({
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
        <div className="nav navbar-right">
          <button className="btn btn-default navbar-btn"
            onClick={ this._pushState.bind(null, "/signup") }>
            Sign Up
          </button>

          <span className="spacer spacer-small"></span>

          <button className="btn btn-default navbar-btn"
            onClick={ this._pushState.bind(null, "/login") }>
            Login
          </button>
        </div>
      );
    }
  },

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">

          <div className="navbar-header">
            <a className="navbar-brand"
              onClick={ this._pushState.bind(null, "/") }>Chime</a>
          </div>

          <ul className="nav navbar-nav nav-links">
            <li>
              <a onClick={ this._pushState.bind(null, "/discover") }>
                Discover
              </a>
            </li>
          </ul>

          <Search pushState={ this._pushState } />

          { this.renderSessionStatus() }
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
