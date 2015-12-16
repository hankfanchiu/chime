var React = require("react");
var SessionNav = require("./session_nav");
var History = require("react-router").History;

var Nav = React.createClass({
  mixins: [History],

  _pushRoot: function (e) {
    this.history.pushState(null, "/", {});
  },

  _pushExplore: function (e) {
    this.history.pushState(null, "/", {});
  },

  render: function () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">

          <div className="navbar-header">
            <a className="navbar-brand"
              onClick={ this._pushRoot }>Chime</a>
          </div>

          <ul className="nav navbar-nav nav-links">
            <li><a onClick={ this._pushExplore }>Explore</a></li>
          </ul>

          <SessionNav email={ this.props.email }
            isLoggedIn={ this.props.isLoggedIn } />

        </div>
      </nav>
    );
  }
});

module.exports = Nav;
