var React = require("react");

var TrackDetail = React.createClass({
  render: function () {
    var track = this.props.track;

    if (!track) {
      return <div className="row" />;
    }

    return (
      <div className="row">
        <h3>Detail</h3>

        <p>
          { this.props.track.description }
        </p>
      </div>
    );
  }
});

module.exports = TrackDetail;
