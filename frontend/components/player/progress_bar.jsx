var React = require("react");

var ProgressBar = React.createClass({
  _seekTo: function (e) {
		var container = this.refs.progressBar;
		var containerStartX = container.offsetLeft;
    var containerWidth = container.offsetWidth;
		var percent = (e.clientX - containerStartX) / containerWidth;
		percent = (percent >= 1 ? 1 : percent);

    var time = this.props.duration * percent;

		this.props.seekTo(time);
  },

  render: function () {
    var position = 0;
    if (this.props.currentTime > 0) {
       var percent = this.props.currentTime / this.props.duration;
       position = percent * 300; // Pixel width of audio progress background
    }

    return (
      <div className="audio-progress-container">
        <div className="audio-progress" onClick={ this._seekTo }>

          <div ref="progressBar"
            className="audio-progress-background"
            style={{ marginLeft: "5px" }}>

            <div ref="progress" className="audio-progress-bar"
              style={{ width: position + "px" }} />

            <div className="audio-progress-bar-handle"
              style={{ left: position + "px" }} />

    			</div>

        </div>
      </div>
    );
  }
});

module.exports = ProgressBar;
