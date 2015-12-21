var React = require("react");
var CollectIndexItem = require("./collect_index_item");

var CollectIndex = React.createClass({
  renderCollectIndexItems: function () {
    var tracks = this.props.tracks;
    var track;

    var searchIndexItems = Object.keys(tracks).map(function (title) {
      track = tracks[title];

      return <CollectIndexItem key={ track.id } track={ track } />;
    });

    return searchIndexItems;
  },

  render: function () {
    return (
      <div className="collect-index clear">
        { this.renderCollectIndexItems() }
      </div>
    );
  }
});

module.exports = CollectIndex;
