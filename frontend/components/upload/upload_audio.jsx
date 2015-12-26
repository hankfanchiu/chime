var React = require("react");
var UploadActions = require("../../actions/upload_actions");

var UploadAudio = React.createClass({
  _handleFile: function () {
    var file = this.refs.file.files[0];

    if (file === null) { return; }

    UploadActions.startDirectUpload("tracks/audio", file);
  },

  render: function () {
    return (
      <div className="upload-audio">
        <span className="btn btn-default btn-file">
          <i className="fa fa-file-audio-o"></i> Upload audio

          <input type="file" accept="audio/*" ref="file"
            onChange={ this._handleFile } />
        </span>
      </div>
    );
  }
});

module.exports = UploadAudio;
