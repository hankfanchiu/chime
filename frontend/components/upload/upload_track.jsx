var React = require("react");

var UploadTrack = React.createClass({
  _handleSoundFile: function (e) {

  },

  render: function () {
    return (
      <form className="upload-track">
        <div className="form-group">
          <label htmlFor="upload-sound">Sound</label>

          <input id="upload-sound" type="file"
            onChange={ this._handleSoundFile } />
        </div>
      </form>
    );
  }
});

module.exports = UploadTrack;
