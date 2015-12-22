var React = require("react");

var UploadImage = React.createClass({
  _handleImageFile: function () {
    var file = this.refs.file.files[0];

    // UploadActions.fetchSignedUrls("image", file.name);
  },

  render: function () {
    return (
      <div className="form-group">
        <label htmlFor="upload-image">Image</label>

        <input id="upload-image" type="file"
          onChange={ this._handleImageFile } />
      </div>
    );
  }
});

module.exports = UploadImage;
