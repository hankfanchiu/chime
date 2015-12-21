var React = require("react");
var SearchIndexItem = require("./search_index_item");

var SearchIndex = React.createClass({
  searchIndexItems: function () {
    var tracks = this.props.tracks;
    var track;

    var searchIndexItems = Object.keys(tracks).map(function (title) {
      track = tracks[title];

      return <SearchIndexItem key={ track.id } track={ track } />;
    });

    return searchIndexItems;
  },

  render: function () {
    return (
      <div className="search-index clear">
        { this.searchIndexItems() }
      </div>
    );
  }
});

module.exports = SearchIndex;
