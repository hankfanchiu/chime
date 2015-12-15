var React = require("react");
var SessionNav = require("./session_nav");
var History = require("react-router").History;

var Nav = React.createClass({
  mixins: [History],

  handleHeaderClick: function (e) {
    this.history.pushState(null, "/", {});
  },

  render: function () {
    return (
      <div className="nav">
        <header>
          <h1 onClick={ this.handleHeaderClick }>Chime</h1>
        </header>

        <SessionNav email={ this.props.email }
          isLoggedIn={ this.props.isLoggedIn } />
      </div>
    );
  }
});

module.exports = Nav;
