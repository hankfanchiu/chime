var React = require("react");
var UploadActions = require("../../actions/upload_actions");

module.exports = React.createClass({
  _handleFile: function () {
    var file = this.refs.file.files[0];

    if (file) {
      UploadActions.startDirectUpload("tracks/audio", file);
    }
  },

  render: function () {
    var label = <span className="required-label">Upload Audio</span>;

    return (
      <div className="upload-audio">
        <span className="btn btn-default btn-file">
          <i className="fa fa-file-audio-o"></i> { label }

          <input type="file" accept="audio/*" ref="file"
            onChange={ this._handleFile } />
        </span>
      </div>
    );
  }
});
