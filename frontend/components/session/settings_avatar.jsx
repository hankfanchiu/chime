var React = require("react");
var Thumbnail = require("react-bootstrap").Thumbnail;
var Glyphicon = require("react-bootstrap").Glyphicon;

module.exports = React.createClass({
  _handleFile: function () {
    var reader = new FileReader();
    var img = this.refs.file.files[0];

    if (img === null) { return; }

    reader.onloadend = function () {
      this.props.setState({ avatarUrl: reader.result });
    }.bind(this);

    reader.readAsDataURL(img);
    this.props.setState({ disabled: false, img: img });
  },

  render: function () {
    return (
      <div className="avatar">
        <span className="btn btn-default btn-file">
          <Glyphicon glyph="camera"/> Update avatar

          <input type="file" accept="image/*" ref="file"
            onChange={ this._handleFile } />
        </span>

        <Thumbnail src={ this.props.avatarUrl } />
      </div>
    );
  }
});
