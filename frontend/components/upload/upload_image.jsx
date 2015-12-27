var React = require("react");
var Thumbnail = require("react-bootstrap").Thumbnail;

var UploadImage = React.createClass({
  getInitialState: function () {
    return { imgUrl: "/assets/4e325cce6262de6c03bff502.jpg" };
  },

  _handleFile: function () {
    var img = this.refs.file.files[0];

    if (img === null) { return; }

    var reader = new FileReader();

    reader.onloadend = function () {
      this.setState({ imgUrl: reader.result });
    }.bind(this);

    reader.readAsDataURL(img);
    this.props.setImg(img);
  },

  render: function () {
    return (
      <div className="upload-img">
        <span className="btn btn-default btn-file">
          <i className="fa fa-file-image-o"></i> Upload image

            <input type="file" accept="image/*" ref="file"
              onChange={ this._handleFile } />
          </span>

        <Thumbnail src={ this.state.imgUrl } />
      </div>
    );
  }
});

module.exports = UploadImage;
