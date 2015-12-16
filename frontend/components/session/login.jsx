var React = require("react");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;
var SessionActions = require("../../actions/session_actions");
var SessionStore = require("../../stores/session_store");
var ErrorNotice = require("../error_notice");

var Login = React.createClass({
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

  _login: function (e) {
    e.preventDefault();

    if (this.isIncomplete()) {
      return this.handleIncompleteSubmit();
    }

    this.setState({ errors: [] });

    var userData = {
      email: this.state.email,
      password: this.refs.password.value
    };

    SessionActions.login(userData);
  },

  _goToSignUp: function (e) {
    this.history.pushState(null, "/signup", {});
  },

  isIncomplete: function () {
    if (this.state.email === "") { return true; }
    if (this.state.password === "") { return true; }

    return false;
  },

  handleIncompleteSubmit: function () {
    alert("Please fill out all fields!");
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
      <div className="container">
        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">

            { this.renderErrorNotice() }

            <h1>Login</h1>

            <form className="login-form" onSubmit={ this._login }>

              <div className="form-group">
                <label htmlFor="login-email">Email</label>

                <input type="text"
                  name="email"
                  className="form-control"
                  id="login-email"
                  valueLink={ this.linkState("email") } />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>

                <input type="password"
                  name="password"
                  className="form-control"
                  ref="password"
                  id="login-password" />
              </div>

              <p>
                <a onClick={ this._goToSignUp }>
                  Don't have an account?
                </a>
              </p>

              <button className="btn btn-default"
                type="submit">Login</button>
            </form>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = Login;
