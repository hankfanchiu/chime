var React = require("react");
var TimeFormatterMixin = require("../../mixins/time_formatter_mixin");

var TimeLabel = React.createClass({
  mixins: [TimeFormatterMixin],

  time: function () {
    if (this.props.time) {
      return this.secondsToTime(this.props.time);
    } else {
      return "00:00";
    }
  },

  spanClassName: function () {
    return "audio-" + this.props.name;
  },

	render: function() {
		return (
      <div className="audio-time-container">
        <div className="audio-time">

    			<span className={ this.spanClassName() }>
            { this.time() }
          </span>
        </div>
      </div>
		);
	}
});

module.exports = TimeLabel;
