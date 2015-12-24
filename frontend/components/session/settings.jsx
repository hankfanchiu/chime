var React = require("react");
var SessionStore = require("../../stores/session_store");
var SessionActions = require("../../actions/session_actions");
var UserActions = require("../../actions/user_actions");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var Settings = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    var user = SessionStore.getCurrentUser();

    return {
      username: user.username,
      email: user.email,
      password: ""
    }
  },

  componentWillMount: function () {
    if (!SessionStore.isLoggedIn()) {
      this.props.history.pushState(null, "/");
    }
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
    SessionActions.fetchCurrentUser(SessionStore.getCurrentUserId());
  },

  shouldComponentUpdate: function () {
    return SessionStore.isLoggedIn();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    var user = SessionStore.getCurrentUser();

    this.setState({
      username: user.username,
      email: user.email,
      password: ""
    });
  },

  _handleSubmit: function (e) {
    e.preventDefault();

    if (this._isIncomplete()) { this._handleIncompleteSubmit(); }

    this._updateUser();
    this.refs.password.value = "";
  },

  _updateUser: function () {
    var userId = SessionStore.getCurrentUserId();
    var userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.refs.password.value,
    };

    UserActions.updateUser(userId, userData);
  },

  _isIncomplete: function () {
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
          <h1>Account Settings</h1>

          <div className="col-xs-4">
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
                className="btn btn-default">Update Account</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Settings;
