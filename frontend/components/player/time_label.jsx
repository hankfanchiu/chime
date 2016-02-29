var React = require("react");
var TimeFormatterMixin = require("../../mixins/time_formatter_mixin");

module.exports = React.createClass({
  mixins: [TimeFormatterMixin],

  time: function () {
    if (this.props.time) {
      return this.secondsToTime(this.props.time);
    } else {
      return "00:00";
    }
  },

	render: function() {
		return (
      <div className="audio-time-container">
        <div className="audio-time">
    			<span className={ "audio-" + this.props.name }>
            { this.time() }
          </span>
        </div>
      </div>
		);
	}
});
