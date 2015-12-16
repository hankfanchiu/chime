var React = require("react");
var SessionActions = require("../../actions/session_actions");
var SessionStore = require("../../stores/session_store");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

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

  _onSubmit: function (e) {
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

  isIncomplete: function () {
    if (this.state.email === "") { return true; }
    if (this.state.password === "") { return true; }

    return false;
  },

  handleIncompleteSubmit: function () {
    alert("Please fill out all fields!");
  },

  render: function () {
    var errors;

    if (this.state.errors.length > 0) {

      var errorMessages = this.state.errors.map(function (error, idx) {
        return <div key={ idx }>{ error }</div>
      });

      errors = <div>{ errorMessages }</div>;

    } else {
      errors = <div></div>
    }

    return (
      <div className="container">
        { errors }

        <form className="login-form" onSubmit={ this._onSubmit }>

          <h2>Login</h2>

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

          <button className="btn btn-default"
            type="submit">Login</button>
        </form>

      </div>
    );
  }
});

module.exports = Login;
