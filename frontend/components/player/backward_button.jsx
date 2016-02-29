var React = require("react");
var PlayerActions = require("../../actions/player_actions");

module.exports = React.createClass({
  playPreviousTrack: function () {
    PlayerActions.playPreviousTrack();
  },

  render: function () {
    return (
      <div className="controller-button">
        <a onClick={ this.playPreviousTrack }>

          <i className="controller-button fa fa-backward"></i>
        </a>
      </div>
    );
  }
});
