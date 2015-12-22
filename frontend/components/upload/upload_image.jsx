var React = require("react");
var UploadActions = require("../../actions/upload_actions");

var UploadImage = React.createClass({
  _handleFile: function () {
    // var file = this.refs.file.files[0];
    //
    // if (file === null) { return; }
    //
    // UploadActions.startDirectUpload("tracks/image", file);
  },

  render: function () {
    return (
      <div className="form-group">
        <label htmlFor="upload-image">Image</label>

        <input id="upload-image" type="file"
          onChange={ this._handleFile } />
      </div>
    );
  }
});

module.exports = UploadImage;
