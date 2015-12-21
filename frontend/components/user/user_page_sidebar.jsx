var React = require("react");

var UserPageSidebar = React.createClass({
  render: function () {
    return (
      <div className="col-xs-4">
        { this.props.user.username }
      </div>
    );
  }
});

module.exports = UserPageSidebar;
