var React = require("react");
var TimeFormatterMixin = require("../../mixins/time_formatter_mixin");

var TimeLabel = React.createClass({
  mixins: [TimeFormatterMixin],

  renderCurrentTime: function () {
    if (this.props.currentTime == undefined) {
      return "00:00";
    } else {
      return this.secondsToTime(this.props.currentTime);
    }
  },

	render: function() {
		return (
      <div className="audio-time-container">
        <div className="audio-time">

    			<span className="audio-time">
            { this.renderCurrentTime() }
          </span>

        </div>
      </div>
		);
	}
});

module.exports = TimeLabel;
