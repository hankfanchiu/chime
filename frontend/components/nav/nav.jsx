var React = require("react");
var SessionStore = require("../../stores/session_store");
var SessionStatus = require("./session/session_status");
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

          <SessionStatus isLoggedIn={ this.state.isLoggedIn }
            user={ this.state.user }
            pushState={ this._pushState } />
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
