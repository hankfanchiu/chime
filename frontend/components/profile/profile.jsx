var React = require("react");
var SessionStore = require("../../stores/session_store");
var ProfileStore = require("../../stores/profile_store");
var ProfileActions = require("../../actions/profile_actions");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var Profile = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return ProfileStore.getProfile();
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
    this.setState(ProfileStore.getProfile());
  },

  _updateProfile: function (e) {
    e.preventDefault();

    if (this.isIncomplete()) { return this._handleIncompleteSubmit(); }

    var userId = SessionStore.getUserId();
    var userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.refs.password.value,
    };

    this.refs.password.value = "";
    ProfileActions.updateUser(userId, userData);
  },

  isIncomplete: function () {
    if (this.state.username === "") { return true; }
    if (this.state.email === "") { return true; }
    if (this.refs.password.value === "") { return true; }

    return false;
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

            <form className="profile-form" onSubmit={ this._updateProfile }>

              <div className="form-group">
                <label htmlFor="profile-username">Username</label>

                <input type="text"
                  name="username"
                  className="form-control"
                  id="profile-username"
                  valueLink={ this.linkState("username") } />
              </div>

              <div className="form-group">
                <label htmlFor="profile-email">Email</label>

                <input type="text"
                  name="email"
                  className="form-control"
                  id="profile-email"
                  valueLink={ this.linkState("email") } />
              </div>

              <div className="form-group">
                <label htmlFor="profile-password">Password Confirmation</label>

                <input type="password"
                  name="password"
                  className="form-control"
                  ref="password"
                  id="profile-password" />
              </div>

              <button className="btn btn-default"
                type="submit">Update Profile</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Profile;
