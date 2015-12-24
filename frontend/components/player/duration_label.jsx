var React = require("react");
var TimeFormatterMixin = require("../../mixins/time_formatter_mixin");

var DurationLabel = React.createClass({
  mixins: [TimeFormatterMixin],

  renderDuration: function () {
    if (!this.props.duration) {
      return "00:00";
    } else {
      return this.secondsToTime(this.props.duration);
    }
  },

  render: function() {
    return (
      <div className="audio-time-container">
        <div className="audio-time">

          <span className="audio-duration">
            { this.renderDuration() }
          </span>

        </div>
      </div>
    );
  }
});

module.exports = DurationLabel;
