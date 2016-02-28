var React = require("react");
var History = require("react-router").History;

var ExploreButton = React.createClass({
  mixins: [History],

  goToDiscover: function () {
    this.history.pushState(null, "/discover");
  },

  render: function () {
    return (
      <section className="explore-button">
        <a className="explore-button" onClick={ this.goToDiscover }>
          Discover what else is trending
        </a>
      </section>
    );
  }
});

module.exports = ExploreButton;
