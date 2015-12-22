var React = require("react");
var UploadStore = require("../../stores/upload_store");
var UploadActions = require("../../actions/upload_actions");
var TrackActions = require("../../actions/track_actions");

var UploadAudio = React.createClass({
  _handleFile: function () {
    var file = this.refs.file.files[0];

    if (file === null) { return; }

    UploadActions.startDirectUpload("audio", file);
  },

  render: function () {
    if (this.props.isUploaded) {
      return (
        <div className="form-group">
          <label htmlFor="upload-sound">Sound</label>

          <p>Sound file uploaded.</p>
        </div>
      );
    } else {
      return (
        <div className="form-group">
          <label htmlFor="upload-sound">Sound</label>

          <input ref="file" id="upload-sound" type="file"
            onChange={ this._handleFile } />
        </div>
      );
    }
  }
});

module.exports = UploadAudio;
