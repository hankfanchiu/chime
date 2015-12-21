var React = require("react");
var UserActions = require("../../actions/user_actions");

var UserPage = React.createClass({
  componentWillMount: function () {
    UserActions.fetchUser(this.props.params.user);
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.params.user !== nextProps.params.user) {
      UserActions.fetchUser(nextProps.params.user);
    }
  },

  render: function () {
    return (
      <div className="container">
        { this.props.children }
      </div>
    );
  }
});

module.exports = UserPage;
