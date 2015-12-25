var React = require("react");

var UploadAudioProgress = React.createClass({
  renderProgressText: function () {
    var percent = this.props.progress * 100;

    if (percent === 100) {
      return "Upload completed!";
    } else {
      return percent.toFixed(1) + "%"
    }
  },

  render: function () {
    var position = this.props.progress * 300;

    return (
      <div className="upload-audio">
        <div className="upload-audio-progress">
          <div className="upload-audio-progress-background"
            style={{ marginLeft: "5px" }}>

            <div className="upload-audio-progress-bar"
              style={{ width: position + "px" }} />

          </div>
        </div>

        <div className="upload-audio-progress-text">
          { this.renderProgressText() }
        </div>
      </div>
    );
  }
});

module.exports = UploadAudioProgress;
