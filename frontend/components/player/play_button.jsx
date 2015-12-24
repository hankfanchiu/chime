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
    var className = "controller-button fa";

    if (this.props.isPlaying) {
      className += " fa-pause";
    } else {
      className += " fa-play";
    }

    return className;
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
