var React = require("react");
var UserActions = require("../../../actions/user_actions");

var UserSidebarAvatar = React.createClass({
  _handleFile: function () {
    var formData = new FormData();
    var img = this.refs.file.files[0];
    var currentUserId = this.props.currentUser.id;

    formData.append("user[avatar]", img);

    UserActions.uploadImage(currentUserId, formData);
  },

  renderUpload: function () {
    var username = this.props.user.username;

    if (this.props.isCurrentUser) {
      return (
        <span className="btn btn-default btn-file">
          <i className="fa fa-camera"></i> Upload new avatar

          <input type="file" accept="image/*"
            ref="file" id="upload-avatar"
            onChange={ this._handleFile } />
        </span>
      );
    }
  },

  render: function () {
    return (
      <div className="avatar">
        <img className="avatar" src={ this.props.user.avatar_square } />

        { this.renderUpload() }
      </div>
    );
  }
});

module.exports = UserSidebarAvatar;
