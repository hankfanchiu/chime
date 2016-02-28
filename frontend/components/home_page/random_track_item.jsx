var React = require("react");
var Col = require("react-bootstrap").Col;
var RoundPlayButton = require("../utility/round_play_button");
var TrackThumbnail = require("../utility/track_thumbnail");

var RandomTrackItem = React.createClass({
  render: function () {
    var track = this.props.track;

    if (!track) { return <Col />; }

    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 }>
        <div className="random-track">
          <RoundPlayButton track={ track } />
          <TrackThumbnail track={ track } />
        </div>
      </Col>
    );
  }
});

module.exports = RandomTrackItem;
