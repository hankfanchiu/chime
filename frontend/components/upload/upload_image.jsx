var React = require("react");
var UploadActions = require("../../actions/upload_actions");

var UploadImage = React.createClass({
  getInitialState: function () {
    return { imgUrl: "/assets/5c7dd1c3f97c7984168c450.jpg" };
  },

  _handleFile: function () {
    var reader = new FileReader();
    var img = this.refs.file.files[0];

    if (img === null) { return; }

    reader.onloadend = function () {
      this.setState({ imgUrl: reader.result });
    }.bind(this);

    reader.readAsDataURL(img);
    this.props.setImg(img);
  },

  render: function () {
    return (
      <div className="form-group upload-img">
        <img className="img" src={ this.state.imgUrl } />

        <span className="btn btn-default btn-file">
          <i className="fa fa-file-image-o"></i> Upload track image

          <input type="file" accept="image/*" ref="file"
            onChange={ this._handleFile } />
        </span>
      </div>
    );
  }
});

module.exports = UploadImage;
