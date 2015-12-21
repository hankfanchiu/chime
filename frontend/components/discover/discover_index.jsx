var React = require("react");
var DiscoverIndexItem = require("./discover_index_item");

var DiscoverIndex = React.createClass({
  discoverListItems: function () {
    var tracks = this.props.tracks;
    var track;

    var discoverIndexItems = Object.keys(tracks).map(function (title) {
      track = tracks[title];

      return <DiscoverIndexItem key={ track.id } track={ track } />;
    });

    return discoverIndexItems;
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
