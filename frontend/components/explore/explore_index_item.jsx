var React = require("react");

var ExploreIndexItem = React.createClass({
  render: function () {
    return (
      <div className="explore-index-item">
        { this.props.track.title }
      </div>
    );
  }
});

module.exports = ExploreIndexItem;
