var React = require("react");
var UploadActions = require("../../actions/upload_actions");

var UploadImage = React.createClass({
  getInitialState: function () {
    return { imgUrl: "/assets/corgi.jpg" };
  },

  _handleFile: function () {
    var reader = new FileReader();
    var img = this.refs.file.files[0];

    reader.onloadend = function () {
      this.setState({ imgUrl: reader.result });
    }.bind(this);

    if (img) {
      reader.readAsDataURL(img);
    }

    this.props.setImg(img);
  },

  render: function () {
    return (
      <div className="form-group upload-img">
        <img className="img" src={ this.state.imgUrl } />

        <span className="btn btn-default btn-file">
          <i className="fa fa-camera"></i> Upload track image

          <input ref="file" id="upload-img" type="file"
            accept=".jpg, .gif, .png"
            onChange={ this._handleFile } />
        </span>
      </div>
    );
  }
});

module.exports = UploadImage;
