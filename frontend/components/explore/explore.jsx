var React = require("react");
var Feed = require("./feed");

var Explore = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {

  },

  render: function () {
    return (
      <div className="container">
        <h1>Explore</h1>

        <Feed />
      </div>
    );
  }
});

module.exports = Explore;
