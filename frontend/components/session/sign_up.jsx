var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;
var UserActions = require("../../actions/user_actions");
var SessionStore = require("../../stores/session_store");

var SignUp = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { username: "", email: "" };
  },

  componentWillMount: function () {
    if (SessionStore.isLoggedIn()) {
      this.history.pushState(null, "/");
    }
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    if (SessionStore.isLoggedIn()) {
      this.history.pushState(null, "/");
    }
  },

  _goToLogin: function () {
    this.history.pushState(null, "/login");
  },

  _signUp: function (e) {
    e.preventDefault();

    if (this.IisIncomplete()) { return this.handleIncompleteSubmit(); }

    var userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value
    };

    UserActions.createUser(userData);
  },

  IisIncomplete: function () {
    if (this.state.username === "") { return true; }
    if (this.state.email === "") { return true; }
    if (this.state.password === "") { return true; }
    if (this.state.passwordConfirmation === "") { return true; }

    return false;
  },

  handleIncompleteSubmit: function () {
    alert("Required fields missing");
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <h1>Create Account</h1>

            <form className="signup-form" onSubmit={ this._signUp }>

              <div className="form-group">
                <label htmlFor="signup-username">Username</label>

                <input type="text"
                  name="username"
                  className="form-control"
                  id="signup-username"
                  valueLink={ this.linkState("username") } />
              </div>

              <div className="form-group">
                <label htmlFor="signup-email">Email</label>

                <input type="text"
                  name="email"
                  className="form-control"
                  id="signup-email"
                  valueLink={ this.linkState("email") } />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password">Password</label>

                <input type="password"
                  name="password"
                  className="form-control"
                  ref="password"
                  id="signup-password" />
              </div>

              <div className="form-group">
                <label htmlFor="signup-password-confirmation">
                  Password Confirmation
                </label>

                <input type="password"
                  name="passwordConfirmation"
                  className="form-control"
                  ref="passwordConfirmation"
                  id="signup-password-confirmation" />
              </div>

              <p>
                <a onClick={ this._goToLogin }>
                  Already have an account?
                </a>
              </p>

              <button className="btn btn-default"
                type="submit">Sign Up</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignUp;
