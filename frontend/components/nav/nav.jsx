var React = require("react");
var NavSession = require("./nav_session");
var History = require("react-router").History;

var Nav = React.createClass({
  mixins: [History],

  _pushState: function (pathname) {
    this.history.pushState(null, pathname);
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

          <NavSession />
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
