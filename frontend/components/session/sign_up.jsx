var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var UserActions = require("../../actions/user_actions");
var SessionActions = require("../../actions/session_actions");
var SignUpStore = require("../../stores/sign_up_store");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

var SignUp = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return {
      show: SignUpStore.showModal(),
      username: "",
      email: "",
      password: ""
    };
  },

  componentDidMount: function () {
    this.listenerToken = SignUpStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    this.signUp();
  },

  disabled: function () {
    return (
      (this.state.username === "") ||
      (this.state.email === "") ||
      (this.state.password === "")
    );
  },

  reset: function () {
    this.setState(this.getInitialState());
    SessionActions.closeSignUp();
  },

  showLogin: function () {
    this.reset();
    SessionActions.showLogin();
  },

  signUp: function () {
    var userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    UserActions.createUser(userData);
    // this.setState(this.getInitialState());
  },

  render: function () {
    return (
      <Modal bsSize="small"
        onHide={ this.reset }
        show={ this.state.show }>

        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>

        <form onSubmit={ this._handleSubmit }>
          <Modal.Body>
            <Input type="text"
              label="Username"
              placeholder="Identify your unique self"
              valueLink={ this.linkState("username") } />

            <Input type="password"
              label="Password"
              placeholder="Enter password"
              help="Use at least 6 characters."
              valueLink={ this.linkState("password") } />

            <Input type="email"
              label="Email Address"
              placeholder="Enter email address"
              valueLink={ this.linkState("email") } />

            <a onClick={ this.showLogin }>
              Already have an account?
            </a>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit"
              bsStyle="primary"
              disabled={ this.disabled() }
              onClick={ this.signUp }>
              Sign Up
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
});

module.exports = SignUp;
