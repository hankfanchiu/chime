var React = require("react");

var Discover = React.createClass({
  render: function () {
    return (
      <div className="col-xs-3 discover-index-item">
        <div className="box">

          <div className="image">
            <img src="/assets/corgi.jpg" />
          </div>

          <div className="title">
            { this.props.track.title }
          </div>

        </div>
      </div>
    );
  }
});

module.exports = Discover;
