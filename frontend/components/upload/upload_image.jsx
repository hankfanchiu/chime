var React = require("react");

var UploadImage = React.createClass({
  _handleImageFile: function (e) {

  },

  render: function () {
    return (
      <form className="upload-track">
        <div className="form-group">
          <label htmlFor="upload-image">Image</label>

          <input id="upload-image" type="file"
            onChange={ this._handleImageFile } />
        </div>
      </form>
    );
  }
});

module.exports = UploadImage;
