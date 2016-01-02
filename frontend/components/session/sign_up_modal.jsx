var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Alert = require("react-bootstrap").Alert;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var UserActions = require("../../actions/user_actions");
var SessionActions = require("../../actions/session_actions");
var SignUpModalStore = require("../../stores/sign_up_modal_store");
var History = require("react-router").History;

var SignUpModal = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      show: SignUpModalStore.showModal(),
      errors: SignUpModalStore.getErrors(),
      username: "",
      usernameValid: false,
      email: "",
      emailValid: false,
      password: "",
      passwordValid: false
    };
  },

  componentDidMount: function () {
    this.listenerToken = SignUpModalStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({
      show: SignUpModalStore.showModal(),
      errors: SignUpModalStore.getErrors(),
      password: ""
    });
  },

  _disabled: function () {
    return (
      (!this.state.usernameValid) ||
      (!this.state.emailValid) ||
      (!this.state.passwordValid)
    );
  },

  _handleEmailChange: function () {
    var email = this.refs.email.getValue();
    var emailInput = this.refs.email.getInputDOMNode();
    var emailValid = emailInput.checkValidity();

    this.setState({ email: email, emailValid: emailValid });
  },

  _handlePasswordChange: function () {
    var password = this.refs.password.getValue();
    var passwordValid = (password.length >= 6);

    this.setState({ password: password, passwordValid: passwordValid });
  },

  _handleUsernameChange: function () {
    var username = this.refs.username.getValue();
    var hasNonStandard = /[^\w]/.test(username);
    var usernameValid = !hasNonStandard;

    this.setState({ username: username, usernameValid: usernameValid });
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    this.signUp();
  },

  _helpPassword: function () {
    if ((this.state.password.length > 0) && (!this.state.passwordValid)) {
      return "Password must be at least 6 characters"
    }
  },

  styleEmail: function () {
    if (this.state.email.length > 0) {
      return (this.state.emailValid ? "success" : "error");
    }
  },

  stylePassword: function () {
    if (this.state.password.length > 0) {
      return (this.state.passwordValid ? "success" : "error");
    }
  },

  styleUsername: function () {
    if (this.state.username.length > 0) {
      return (this.state.usernameValid ? "success" : "error");
    }
  },

  errors: function () {
    if (this.state.errors.length === 1) {
      return <Alert bsStyle="danger">{ this.state.errors }</Alert>;
    }

    var errorList = this.state.errors.map(function (error, idx) {
      return <li key={ idx }>{ error }</li>;
    });

    return (
      <Alert bsStyle="danger">
        <ul>{ errorList }</ul>
      </Alert>
    );
  },

  reset: function () {
    this.setState(this.getInitialState());
    SessionActions.closeSignUpModal();
  },

  showLogin: function () {
    this.reset();
    SessionActions.showLoginModal();
  },

  signUp: function () {
    var userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };

    UserActions.createUser(userData);
  },

  render: function () {
    var noErrors = (this.state.errors.length === 0);

    return (
      <Modal bsSize="small" onHide={ this.reset } show={ this.state.show }>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>

        <form onSubmit={ this._handleSubmit } ref="form">
          <Modal.Body>
            { noErrors ? "" : this.errors() }

            <Input type="text"
              value={ this.state.username }
              label="Username"
              ref="username"
              bsStyle={ this.styleUsername() }
              hasFeedback
              placeholder="Identify your unique self"
              onChange={ this._handleUsernameChange } />

            <Input type="password"
              value={ this.state.password }
              label="Password"
              ref="password"
              bsStyle={ this.stylePassword() }
              hasFeedback
              help={ this._helpPassword() }
              placeholder="Enter a password"
              onChange={ this._handlePasswordChange } />

            <Input type="email"
              value={ this.state.email }
              label="Email Address"
              ref="email"
              bsStyle={ this.styleEmail() }
              hasFeedback
              placeholder="Enter your email address"
              onChange={ this._handleEmailChange } />

            <a onClick={ this.showLogin }>
              Already have an account?
            </a>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit"
              bsStyle="primary"
              disabled={ this._disabled() }
              onClick={ this.signUp }>
              Sign Up
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
});

module.exports = SignUpModal;
