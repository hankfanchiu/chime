var React = require("react");
var DiscoverIndexItem = require("./discover_index_item");

var Discover = React.createClass({
  renderIndexItems: function () {
    return this.props.tracks.map(function (track, idx) {
      return <DiscoverIndexItem key={ idx } track={ track } />;
    });
  },

  render: function () {
    return (
      <div className="row discover-index">
        { this.renderIndexItems() }
      </div>
    );
  }
});

module.exports = Discover;
