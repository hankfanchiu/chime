var React = require("react");
var DiscoverIndexItem = require("./discover_index_item");

var DiscoverIndex = React.createClass({
  discoverListItems: function () {
    return this.props.tracks.map(function (track, idx) {
      return <DiscoverIndexItem key={ idx } track={ track } />;
    });
  },

  render: function () {
    return (
      <div className="discover-list">
        { this.discoverListItems() }
      </div>
    );
  }
});

module.exports = DiscoverIndex;
