var React = require("react");
var SessionStore = require("../../stores/session_store");
var NavSession = require("./nav_session");
var NavSearch = require("./nav_search");

var Nav = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    return {
      isLoggedIn: SessionStore.isLoggedIn(),
      username: SessionStore.getCurrentUserUsername()
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
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container container-fluid">

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

            <li>
              <a onClick={ this._pushState.bind(null, "/search") }>
                Search
              </a>
            </li>
          </ul>

          <NavSearch />

          <NavSession isLoggedIn={ this.state.isLoggedIn }
            username={ this.state.username }
            pushState={ this._pushState } />
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
