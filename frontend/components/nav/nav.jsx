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
      <div className="nav">
        <header>
          <h1 onClick={ this._pushRoot }>Chime</h1>
        </header>

        <ul className="nav-links">
          <li><a onClick={ this._pushExplore }>Explore</a></li>
        </ul>

        <SessionNav email={ this.props.email }
          isLoggedIn={ this.props.isLoggedIn } />
      </div>
    );
  }
});

module.exports = Nav;
