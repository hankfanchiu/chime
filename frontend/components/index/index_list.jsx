var React = require("react");
var IndexListItem = require("./index_list_item");

var IndexList = React.createClass({
  indexListItems: function () {
    return this.props.tracks.map(function (track, idx) {
      return <IndexListItem key={ idx } track={ track } />;
    });
  },

  render: function () {
    return (
      <div className="index-list">
        { this.indexListItems() }
      </div>
    );
  }
});

module.exports = IndexList;
