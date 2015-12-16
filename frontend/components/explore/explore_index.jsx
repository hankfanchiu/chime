var React = require("react");
var ExploreIndexItem = require("./explore_index_item");

var ExploreIndex = React.createClass({
  renderIndexItems: function () {
    return this.props.tracks.map(function (track, idx) {
      return <ExploreIndexItem key={ idx } track={ track } />;
    });
  },

  render: function () {
    return (
      <div className="explore-index">
        { this.renderIndexItems() }
      </div>
    );
  }
});

module.exports = ExploreIndex;
