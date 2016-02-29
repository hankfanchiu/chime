var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;
var PlayerActions = require("../../actions/player_actions");

module.exports = React.createClass({
  playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  render: function () {
    return (
      <span className="btn play-button" onClick={ this.playTrack }>
        <Glyphicon glyph="play" className="play-icon"/>
      </span>
    );
  }
});
