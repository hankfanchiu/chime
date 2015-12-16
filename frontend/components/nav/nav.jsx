var React = require("react");
var SessionNav = require("./session_nav");
var History = require("react-router").History;

var Nav = React.createClass({
  mixins: [History],

  _root: function (e) {
    this.history.pushState(null, "/", {});
  },

  _discover: function (e) {
    this.history.pushState(null, "/", {});
  },

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">

          <div className="navbar-header">
            <a className="navbar-brand" onClick={ this._root }>Chime</a>
          </div>

          <ul className="nav navbar-nav nav-links">
            <li>
              <a onClick={ this._discover }>Discover</a>
            </li>
          </ul>

          <SessionNav email={ this.props.username }
            isLoggedIn={ this.props.isLoggedIn } />

        </div>
      </nav>
    );
  }
});

module.exports = Nav;
