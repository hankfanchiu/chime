var React = require("react");

var ExploreIndexItem = React.createClass({
  render: function () {
    return (
      <div className="col-xs-2 explore-index-item">
        <div className="image">
          <img src="/assets/corgi.jpg" />
        </div>

        <div className="title">
          { this.props.track.title }
        </div>
      </div>
    );
  }
});

module.exports = ExploreIndexItem;
