var React = require("react");
var UserStore = require("../../../stores/user_store");

var ProfileIndex = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { user: UserStore.getUser() };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <div className="profile-index clear">
        Detailed profile information about { this.state.user.username }.
      </div>
    );
  }
});

module.exports = ProfileIndex;
