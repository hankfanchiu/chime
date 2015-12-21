var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;
var SessionActions = require("../../actions/session_actions");
var SessionStore = require("../../stores/session_store");

var Login = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { username: "", password: "" };
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

  _goToSignUp: function () {
    this.history.pushState(null, "/signup");
  },

  _handleSubmit: function (e) {
    e.preventDefault();

    if (this.isIncomplete()) { return this.handleIncompleteSubmit(); }

    this._login();
  },

  _loginDemo: function (e) {
    e.preventDefault();

    var demoData = { username: "test", password: "password" };

    this.setState(demoData);
    SessionActions.login(demoData);
  },

  _login: function () {
    var userData = {
      username: this.state.username,
      password: this.refs.password.value
    };

    SessionActions.login(userData);
  },

  isIncomplete: function () {
    if (this.state.username === "") { return true; }
    if (this.state.password === "") { return true; }

    return false;
  },

  handleIncompleteSubmit: function () {
    alert("Please fill out all fields!");
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <h1>Login</h1>

            <form className="login-form" onSubmit={ this._handleSubmit }>

              <div className="form-group">
                <label htmlFor="login-username">Username</label>

                <input type="text"
                  name="username"
                  className="form-control"
                  id="login-username"
                  valueLink={ this.linkState("username") } />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>

                <input type="password"
                  name="password"
                  className="form-control"
                  ref="password"
                  id="login-password"
                  valueLink={ this.linkState("password") } />
              </div>

              <p>
                <a onClick={ this._goToSignUp }>
                  Don't have an account?
                </a>
              </p>

              <button className="btn btn-default btn-primary"
                type="submit">Login</button>

              <span style={{ paddingRight: "10px" }}></span>

              <button className="btn btn-default"
                onClick={ this._loginDemo }>Demo</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
