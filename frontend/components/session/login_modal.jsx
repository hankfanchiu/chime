var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var Modal = require("react-bootstrap").Modal;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var UserActions = require("../../actions/user_actions");
var SessionActions = require("../../actions/session_actions");
var LoginModalStore = require("../../stores/login_modal_store");
var Errors = require("../utility/errors");

module.exports = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      errors: LoginModalStore.getErrors(),
      isLoggingIn: LoginModalStore.isLoggingIn(),
      show: LoginModalStore.showModal(),
      username: "",
      password: ""
    };
  },

  componentDidMount: function () {
    this.listenerToken = LoginModalStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _buttonState: function () {
    return (this.state.isLoggingIn ? "Logging In..." : "Login");
  },

  _disabled: function () {
    return (
      (this.state.isLoggingIn) ||
      (this.state.username === "") ||
      (this.state.password === "")
    );
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    this.login();
  },

  loginDemo: function () {
    var demoData = { username: "demo_user", password: "password" };

    this.setState(demoData);
    SessionActions.login(demoData);
  },

  login: function () {
    var username = this.state.username.toLowerCase();
    var password = this.state.password;

    SessionActions.login({ username: username, password: password });
  },

  reset: function () {
    SessionActions.closeLoginModal();
    this.setState(this.getInitialState());
  },

  showSignUp: function () {
    this.reset();
    SessionActions.showSignUpModal();
  },

  render: function () {
    return (
      <Modal bsSize="small" onHide={ this.reset } show={ this.state.show }>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <form onSubmit={ this._handleSubmit }>
          <Modal.Body>
            <Errors errors={ this.state.errors } />

            <Input type="text"
              label="Username"
              placeholder="Enter your username"
              valueLink={ this.linkState("username") } />

            <Input type="password"
              label="Password"
              placeholder="Enter your password"
              valueLink={ this.linkState("password") } />

            <a onClick={ this.showSignUp }>
              Don't have an account?
            </a>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ this.loginDemo }>Demo</Button>

            <Button type="submit"
              bsStyle="primary"
              disabled={ this._disabled() }
              onClick={ this.login }>{ this._buttonState() }</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
});
