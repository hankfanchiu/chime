var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;
var Thumbnail = require("react-bootstrap").Thumbnail;
var UserActions = require("../../actions/user_actions");

var UserSidebarAvatar = React.createClass({
  _handleFile: function () {
    var formData = new FormData();
    var img = this.refs.file.files[0];
    var clientId = this.props.client.id;

    formData.append("user[avatar]", img);

    UserActions.updateUser(clientId, formData);
  },

  noUpload: function () {
    return (
      <div className="avatar">
        <Thumbnail src={ this.props.user.avatar_square } />
      </div>
    );
  },

  render: function () {
    if (!this.props.isClient) { return this.noUpload(); }

    return (
      <div className="avatar">
        <span className="btn btn-default btn-file">
          <Glyphicon glyph="camera"/> Update avatar

          <input type="file" accept="image/*"
            ref="file" id="upload-avatar"
            onChange={ this._handleFile } />
        </span>

        <Thumbnail src={ this.props.user.avatar_square } />
      </div>
    );
  }
});

module.exports = UserSidebarAvatar;
