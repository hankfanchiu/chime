var React = require("react");
var SessionStore = require("../../../stores/session_store");
var UserSidebarAvatar = require("./user_sidebar_avatar");

var UserSidebar = React.createClass({
  render: function () {
    return (
      <div className="col-xs-4">
        <div className="user-sidebar">
          <UserSidebarAvatar user={ this.props.user }
            currentUser={ this.props.currentUser }
            isCurrentUser={ this.props.isCurrentUser } />

          <div className="username">
            <h3>{ this.props.user.username }</h3>
          </div>

          <p>This contains an overview of the user.</p>
        </div>
      </div>
    );
  }
});

module.exports = UserSidebar;
