var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;
var SessionActions = require("../../actions/session_actions");
var SessionStore = require("../../stores/session_store");
var ErrorNotice = require("../error_notice");

var SignUp = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { email: "", errors: [] };
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    if (SessionStore.isLoggedIn()) {
      this.history.pushState(null, "/", {});
    } else {
      this.setState({ errors: SessionStore.getErrors() });
    }
  },

  _signUp: function (e) {
    e.preventDefault();

    if (this.isIncomplete()) {
      return this.handleIncompleteSubmit();
    }

    this.setState({ errors: [] });

    var userData = {
      email: this.state.email,
      password: this.refs.password.value,
      password_confirmation: this.refs.passwordConfirmation.value
    };

    SessionActions.signUp(userData);
  },

  _goToLogin: function (e) {
    this.history.pushState(null, "/login", {});
  },

  isIncomplete: function () {
    if (this.state.email === "") { return true; }
    if (this.state.password === "") { return true; }
    if (this.state.passwordConfirmation === "") { return true; }

    return false;
  },

  handleIncompleteSubmit: function () {
    alert("Missing required fields");
  },

  renderErrorNotice: function () {
    if (this.state.errors.length > 0) {
      return <ErrorNotice errors={ this.state.errors } />;
    } else {
      return <ul className="error-notice" />
    }
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">

          { this.renderErrorNotice() }

          <h1>Create Account</h1>

          <form className="signup-form" onSubmit={ this._signUp }>

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
                Already have an account with us?
              </a>
            </p>

            <button className="btn btn-default"
              type="submit">Sign Up</button>
          </form>

        </div>
      </div>
    );
  }
});

module.exports = SignUp;
