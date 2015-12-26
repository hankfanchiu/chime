var React = require("react");
var Col = require("react-bootstrap").Col;
var UserSidebarAvatar = require("./user_sidebar_avatar");

var UserSidebar = React.createClass({
  render: function () {
    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 }>
        <UserSidebarAvatar user={ this.props.user }
          currentUser={ this.props.currentUser }
          isCurrentUser={ this.props.isCurrentUser } />

        <div className="username">
          <h3>{ this.props.user.username }</h3>
        </div>

        <p>This contains an overview of the user.</p>
      </Col>
    );
  }
});

module.exports = UserSidebar;
