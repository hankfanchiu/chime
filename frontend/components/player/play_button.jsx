var React = require("react");

var PlayButton = React.createClass({
  _togglePlayPause: function () {
    if (this.props.isPlaying) {
      this.props.pauseAudio();
    } else if (this.props.isPaused) {
      this.props.playAudio();
    }
  },

  playPauseClassName: function () {
    return (this.props.isPlaying ? "fa fa-pause" : "fa fa-play");
  },

  render: function () {
    return (
      <div className="controller-button">
        <a onClick={ this._togglePlayPause }>
          <i className={ this.playPauseClassName() }></i>
        </a>
      </div>
    );
  }
});

module.exports = PlayButton;
