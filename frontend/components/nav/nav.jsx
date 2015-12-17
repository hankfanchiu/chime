var React = require("react");
var NavSession = require("./nav_session");
var History = require("react-router").History;

var Nav = React.createClass({
  mixins: [History],

  _root: function () {
    this.history.pushState(null, "/", {});
  },

  _discover: function () {
    this.history.pushState(null, "/discover", {});
  },

  _search: function () {
    this.history.pushState(null, "/search", {});
  },

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container container-fluid">

          <div className="navbar-header">
            <a className="navbar-brand" onClick={ this._root }>Chime</a>
          </div>

          <ul className="nav navbar-nav nav-links">
            <li><a onClick={ this._discover }>Discover</a></li>
            <li><a onClick={ this._search }>Search</a></li>
          </ul>

          <NavSession />
        </div>
      </nav>
    );
  }
});

module.exports = Nav;
