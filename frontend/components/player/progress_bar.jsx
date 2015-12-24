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
    var width = 0;
    if (this.props.currentTime > 0) {
       var percent = (this.props.currentTime / this.props.duration) * 100;
       var width = Math.floor(percent);
    }

    return (
      <div ref="progressBar"
        className="progress-bar audio-progress-container pull-left"
        style={{ marginLeft: '5px' }}
        onClick={ this._seekTo }>

        <span ref="progress" className="progress audio-progress"
          style={{ width: width + "%" }} />

			</div>
    );
  }
});

module.exports = ProgressBar;
