var React = require("react");
var SearchIndexItem = require("./search_index_item");

var SearchIndex = React.createClass({
  searchIndexItems: function () {
    return this.props.tracks.map(function (track, idx) {
      return <SearchIndexItem key={ idx } track={ track } />;
    });
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
