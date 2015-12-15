var React = require("react");
var SessionActions = require("../../actions/session_actions");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

var SignUp = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { email: "", password: "", passwordConfirmation: "" };
  },

  resetState: function () {
    this.setState({ email: "", password: "", passwordConfirmation: "" });
  },

  isIncomplete: function () {
    if (this.state.email === "") { return true; }
    if (this.state.password === "") { return true; }
    if (this.state.passwordConfirmation === "") { return true; }

    return false;
  },

  handleIncompleteSubmit: function () {
    alert("Please fill out all fields!");
  },

  handleSubmit: function (e) {
    e.preventDefault();

    if (this.isIncomplete()) {
      return this.handleIncompleteSubmit();
    }

    var userData = {
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    };

    SessionActions.signUp(userData);
    this.resetState();
  },

  render: function () {
    return (
      <form className="signup-form" onSubmit={ this.handleSubmit }>

        <h2>Create Your Account</h2>

        <div className="form-group">
          <label htmlFor="signup-email">Email</label>

          <input type="text"
            className="form-control"
            id="signup-email"
            valueLink={ this.linkState("email") } />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password">Password</label>

          <input type="password"
            className="form-control"
            id="signup-password"
            valueLink={ this.linkState("password") } />
        </div>

        <div className="form-group">
          <label htmlFor="signup-password-confirmation">
            Password Confirmation
          </label>

          <input type="password"
            className="form-control"
            id="signup-password-confirmation"
            valueLink={ this.linkState("passwordConfirmation") } />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    );
  }
});

module.exports = SignUp;
