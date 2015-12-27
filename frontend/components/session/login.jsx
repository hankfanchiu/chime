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
      showModal: false,
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
    this.setState({ showModal: LoginStore.showModal() });
  },

  _handleSubmit: function (e) {
    e.preventDefault();

    if (this._validateComplete()) { this.login(); }
  },

  _validateComplete: function () {
    if (this.state.username === "") { return false; }
    if (this.state.password === "") { return false; }

    return true;
  },

  loginDemo: function (e) {
    var demoData = { username: "demo_user", password: "password" };

    this.setState(demoData);
    SessionActions.login(demoData);
  },

  login: function () {
    var userData = {
      username: this.state.username.toLowerCase(),
      password: this.state.password
    };

    SessionActions.login(userData);
    this.setState({ username: "", password: "" });
  },

  reset: function () {
    this.setState(this.getInitialState());
    SessionActions.closeLoginModal();
  },

  showSignUpModal: function () {
    this.reset();
    SessionActions.showSignUpModal();
  },

  renderLoginButton: function () {
    var isComplete = this._validateComplete();

    if (!isComplete) {
      return <Button bsStyle="primary" disabled>Login</Button>;
    }

    return (
      <Button type="submit"
        bsStyle="primary"
        onClick={ this.login }>Login</Button>
    );
  },

  render: function () {
    return (
      <Modal backdrop="static"
        bsSize="small"
        onHide={ this.reset }
        show={ this.state.showModal }>

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

            <a onClick={ this.showSignUpModal }>
              Don't have an account?
            </a>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ this.loginDemo }>Demo</Button>

            { this.renderLoginButton() }
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
});

module.exports = Login;
