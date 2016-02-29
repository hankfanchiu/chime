var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;
var PlayerActions = require("../../actions/player_actions");

module.exports = React.createClass({
  addToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  render: function () {
    return (
      <span className="btn btn-default add-to-queue"
        onClick={ this.addToQueue }>

        <Glyphicon glyph="plus" className="plus-icon"/> Add to queue
      </span>
    );
  }
});
