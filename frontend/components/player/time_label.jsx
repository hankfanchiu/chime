var React = require("react");
var TimeFormatterMixin = require("../../mixins/time_formatter_mixin");

var TimeLabel = React.createClass({
  mixins: [TimeFormatterMixin],

	render: function() {
		if (this.props.currentTime == undefined || !this.props.duration) {
			return <span />;
		}

		var currentTime = this.secondsToTime(this.props.currentTime);
		var duration = this.secondsToTime(this.props.duration);

		return (
			<span className="audio-time pull-right">
        { currentTime } / { duration }
      </span>
		);
	}
});

module.exports = TimeLabel;
