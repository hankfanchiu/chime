var React = require("react");
var TracksIndexItem = require("./tracks_index_item");

var TracksIndex = React.createClass({
  tracksIndexItems: function () {
    return this.props.tracks.map(function (track, idx) {
      return <TracksIndexItem key={ idx } track={ track } />;
    });
  },

  render: function () {
    return (
      <div className="tracks-index clear">

        { this.tracksIndexItems() }

      </div>
    );
  }
});

module.exports = TracksIndex;
