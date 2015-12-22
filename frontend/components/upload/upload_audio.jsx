var React = require("react");

var UploadAudio = React.createClass({
  _handleSoundFile: function (e) {
    var formData = new FormData();
    debugger;
  },

  render: function () {
    return (
      <form className="upload-track">
        <div className="form-group">
          <label htmlFor="upload-sound">Sound</label>

          <input ref="file" id="upload-sound" type="file"
            onChange={ this._handleSoundFile } />
        </div>
      </form>
    );
  }
});

module.exports = UploadAudio;
