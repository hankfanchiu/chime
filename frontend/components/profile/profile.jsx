var React = require("react");
var SessionStore = require("../../stores/session_store");
var ProfileStore = require("../../stores/profile_store");
var ProfileActions = require("../../actions/profile_actions");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var Profile = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    var user = ProfileStore.getProfile();

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: ""
    }
  },

  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) {
      this.props.history.pushState(null, "/", {});
    }
  },

  componentDidMount: function () {
    this.listenerToken = ProfileStore.addListener(this._onChange);
    ProfileActions.fetchUser(SessionStore.getUserId());
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    var user = ProfileStore.getProfile();

    this.setState({
      username: user.username,
      email: user.email,
      password: ""
    });
  },

  _handleSubmit: function (e) {
    e.preventDefault();

    if (this.isIncomplete()) { this._handleIncompleteSubmit(); }

    this._updateUser();
    this.refs.password.value = "";
  },

  _updateUser: function () {
    var userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.refs.password.value,
    };

    ProfileActions.updateUser(this.state.id, userData);
  },

  isIncomplete: function () {
    return (
      (this.state.username === "") ||
      (this.state.email === "") ||
      (this.refs.password.value === "")
    );
  },

  _handleIncompleteSubmit: function () {
    alert("Required fields missing");
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <h1>Profile</h1>

            <form className="profile-form" onSubmit={ this._handleSubmit }>

              <div className="form-group">
                <label htmlFor="profile-username">Username</label>

                <input type="text"
                  className="form-control"
                  id="profile-username"
                  valueLink={ this.linkState("username") } />
              </div>

              <div className="form-group">
                <label htmlFor="profile-email">Email</label>

                <input type="text"
                  className="form-control"
                  id="profile-email"
                  valueLink={ this.linkState("email") } />
              </div>

              <div className="form-group">
                <label htmlFor="profile-password">
                  Password Confirmation
                </label>

                <input type="password"
                  className="form-control"
                  ref="password"
                  id="profile-password" />
              </div>

              <button type="submit"
                className="btn btn-default">Update Profile</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Profile;
