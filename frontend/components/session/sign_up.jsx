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
      showModal: false,
      username: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };
  },

  componentDidMount: function () {
    this.listenerToken = SignUpStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ showModal: SignUpStore.showModal() });
  },

  _handleSubmit: function (e) {
    e.preventDefault();

    if (this._validateComplete()) { return this.signUp(); }
  },

  _validateComplete: function () {
    if (this.state.username === "") { return false; }
    if (this.state.email === "") { return false; }
    if (this.state.password === "") { return false; }
    if (this.state.passwordConfirmation === "") { return false; }

    return true;
  },

  reset: function () {
    this.setState(this.getInitialState());
    SessionActions.closeSignUpModal();
  },

  showLoginModal: function () {
    this.reset();
    SessionActions.showLoginModal();
  },

  signUp: function () {
    var userData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    };

    UserActions.createUser(userData);
  },

  renderSubmitButton: function () {
    var isComplete = this._validateComplete();

    if (!isComplete) {
      return <Button bsStyle="primary" disabled>Sign Up</Button>;
    }

    return (
      <Button type="submit"
        bsStyle="primary"
        onClick={ this.signUp }>Sign Up</Button>
    );
  },

  render: function () {
    return (
      <Modal backdrop="static"
        bsSize="small"
        onHide={ this.reset }
        show={ this.state.showModal }>

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
              valueLink={ this.linkState("password") } />

            <Input type="email"
              label="Email Address"
              placeholder="Enter email address"
              valueLink={ this.linkState("email") } />

            <Input type="password"
              label="Password Confirmation"
              placeholder="Confirm your password"
              valueLink={ this.linkState("passwordConfirmation") } />

            <a onClick={ this.showLoginModal }>
              Already have an account?
            </a>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ this.reset }>Cancel</Button>

            { this.renderSubmitButton() }
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
});

module.exports = SignUp;
