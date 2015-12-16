var React = require("react");
var DiscoverListItem = require("./discover_list_item");

var DiscoverList = React.createClass({
  discoverListItems: function () {
    return this.props.tracks.map(function (track, idx) {
      return <DiscoverListItem key={ idx } track={ track } />;
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

module.exports = DiscoverList;
