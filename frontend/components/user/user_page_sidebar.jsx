var React = require("react");
var SessionStore = require("../../stores/session_store");
var UserActions = require("../../actions/user_actions");

var UserPageSidebar = React.createClass({
  _handleFile: function () {
    var file = this.refs.file.files[0];
    var currentUserId = SessionStore.getCurrentUserId();

    UserActions.uploadImage(currentUserId, file);
  },

  renderUpload: function () {
    var username = this.props.user.username;
    var isCurrentUser = SessionStore.isCurrentUser(username);

    if (isCurrentUser) {
      return (
        <span>
          <input ref="file" id="upload-avatar" type="file"
            onChange={ this._handleFile } />

          <span className="btn btn-default btn-file">
            Upload new avatar
          </span>
        </span>
      );
    }
  },

  render: function () {
    return (
      <div className="col-xs-4">
        <div className="user-sidebar">
          <div className="avatar">
            <img className="avatar" src={ this.props.user.avatar_square } />

            { this.renderUpload() }
          </div>

          <div className="username">
            <h3>{ this.props.user.username }</h3>
          </div>

          <p>This contains an overview of the user.</p>
        </div>
      </div>
    );
  }
});

module.exports = UserPageSidebar;
