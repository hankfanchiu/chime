var React = require("react");
var SearchListItem = require("./search_list_item");

var SearchList = React.createClass({
  searchListItems: function () {
    return this.props.tracks.map(function (track, idx) {
      return <SearchListItem key={ idx } track={ track } />;
    });
  },

  render: function () {
    return (
      <div className="search-list clear">

        { this.searchListItems() }

      </div>
    );
  }
});

module.exports = SearchList;
