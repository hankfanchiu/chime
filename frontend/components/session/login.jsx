var React = require("react");
var SessionActions = require("../../actions/session_actions");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

var Login = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return { email: "", password: "" };
  },

  resetState: function () {
    this.setState({ email: "", password: "" });
  },

  isIncomplete: function () {
    if (this.state.email === "") { return true; }
    if (this.state.password === "") { return true; }

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
      password: this.state.password
    };

    SessionActions.login(userData);
    this.resetState();
  },

  render: function () {
    return (
      <form className="login-form" onSubmit={ this.handleSubmit }>

        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="login-email">Email</label>

          <input type="text"
            className="form-control"
            id="login-email"
            valueLink={ this.linkState("email") } />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>

          <input type="password"
            className="form-control"
            id="login-password"
            valueLink={ this.linkState("password") } />
        </div>

        <button type="submit">Login</button>
      </form>
    );
  }
});

module.exports = Login;
