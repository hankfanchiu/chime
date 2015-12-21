var React = require("react");

var UserPageSidebar = React.createClass({
  render: function () {
    return (
      <div className="col-xs-4">
        <div className="username">
          <h2>{ this.props.user.username }</h2>
        </div>

        <p>This contains an overview of the user.</p>
      </div>
    );
  }
});

module.exports = UserPageSidebar;
