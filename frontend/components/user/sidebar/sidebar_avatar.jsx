var React = require("react");
var SessionStore = require("../../../stores/session_store");
var UserActions = require("../../../actions/user_actions");

var SidebarAvatar = React.createClass({
  _handleFile: function () {
    var file = this.refs.file.files[0];
    var formData = new FormData();
    var currentUserId = SessionStore.getCurrentUserId();

    formData.append("user[avatar]", file);

    UserActions.uploadImage(currentUserId, formData);
  },

  renderUpload: function () {
    var username = this.props.user.username;
    var isCurrentUser = SessionStore.isCurrentUser(username);

    if (isCurrentUser) {
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

module.exports = SidebarAvatar;
