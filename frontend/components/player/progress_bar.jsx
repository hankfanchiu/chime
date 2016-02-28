var React = require("react");
var PlayerActions = require("../../actions/player_actions");

var ProgressBar = React.createClass({
  seekTo: function (e) {
		var container = this.refs.progressBar;
		var containerStartX = container.offsetLeft;
    var containerWidth = container.offsetWidth;
		var percent = (e.clientX - containerStartX) / containerWidth;
		percent = (percent >= 1 ? 1 : percent);

    var time = this.props.duration * percent;

		PlayerActions.seekTo(time);
  },

  position: function () {
    if (this.props.currentTime > 0) {
      // Pixel width of audio progress background is 350px:
      return (this.props.currentTime / this.props.duration) * 350;
    } else {
      return 0;
    }
  },

  render: function () {
    return (
      <div className="audio-progress-container">
        <div className="audio-progress" onClick={ this.seekTo }>

          <div ref="progressBar"
            className="audio-progress-background"
            style={{ marginLeft: "5px" }}>

            <div ref="progress" className="audio-progress-bar"
              style={{ width: this.position() + "px" }} />

            <div className="audio-progress-bar-handle"
              style={{ left: this.position() + "px" }} />
    			</div>
        </div>
      </div>
    );
  }
});

module.exports = ProgressBar;
