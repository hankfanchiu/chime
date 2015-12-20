var React = require("react");
var ProfileStore = require("../../stores/profile_store");

var ProfileIndex = React.createClass({
  getInitialState: function () {
    return { user: ProfileStore.getProfile() };
  },

  componentDidMount: function () {
    this.listenerToken = ProfileStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ user: ProfileStore.getProfile() });
  },

  render: function () {
    return (
      <div className="profile-index clear">
        { this.state.user.username }
      </div>
    )
  }
});

module.exports = ProfileIndex;
