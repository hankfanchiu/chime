var React = require("react");
var PlayerActions = require("../../actions/player_actions");

module.exports = React.createClass({
  togglePlayPause: function () {
    if (this.props.isPlaying) {
      PlayerActions.pauseAudio();
    } else {
      PlayerActions.playAudio();
    }
  },

  playPauseClassName: function () {
    var className = "controller-button fa fa-";

    if (this.props.isPlaying) {
      return className + "pause";
    } else {
      return className + "play";
    }
  },

  render: function () {
    return (
      <div className="controller-button">
        <a onClick={ this.togglePlayPause }>
          <i className={ this.playPauseClassName() }></i>
        </a>
      </div>
    );
  }
});
