var React = require("react");
var UserStore = require("../../../stores/user_store");

var ProfileIndex = React.createClass({
  getInitialState: function () {
    return { user: UserStore.getUser() };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ user: UserStore.getUser() });
  },

  render: function () {
    return (
      <div className="profile-index clear">
        Detailed profile information about the user.

        Email: { this.state.user.email }
      </div>
    )
  }
});

module.exports = ProfileIndex;
