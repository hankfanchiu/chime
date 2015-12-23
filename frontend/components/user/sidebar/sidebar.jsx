var React = require("react");
var SessionStore = require("../../../stores/session_store");
var UserActions = require("../../../actions/user_actions");
var SidebarAvatar = require("./sidebar_avatar");

var Sidebar = React.createClass({
  render: function () {
    return (
      <div className="col-xs-4">
        <div className="user-sidebar">
          <SidebarAvatar user={ this.props.user } />

          <div className="username">
            <h3>{ this.props.user.username }</h3>
          </div>

          <p>This contains an overview of the user.</p>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
