var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var UserActions = require("../../actions/user_actions");
var SessionActions = require("../../actions/session_actions");
var LoginStore = require("../../stores/login_store");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

var Login = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return {
      show: LoginStore.showModal(),
      username: "",
      password: ""
    };
  },

  componentDidMount: function () {
    this.listenerToken = LoginStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    this.login();
  },

  disabled: function () {
    return (this.state.username === "") || (this.state.password === "");
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
    SessionActions.closeLogin();
    this.setState(this.getInitialState());
  },

  showSignUp: function () {
    this.reset();
    SessionActions.showSignUp();
  },

  render: function () {
    return (
      <Modal bsSize="small"
        onHide={ this.reset }
        show={ this.state.show }>

        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <form onSubmit={ this._handleSubmit }>
          <Modal.Body>
            <Input type="text"
              label="Username"
              placeholder="Enter username"
              valueLink={ this.linkState("username") } />

            <Input type="password"
              label="Password"
              placeholder="Enter password"
              valueLink={ this.linkState("password") } />

            <a onClick={ this.showSignUp }>
              Don't have an account?
            </a>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ this.loginDemo }>Demo</Button>

            <Button type="submit"
              bsStyle="primary"
              disabled={ this.disabled() }
              onClick={ this.login }>Login</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
});

module.exports = Login;
