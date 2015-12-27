var React = require("react");
var Grid = require("react-bootstrap").Grid;
var PageHeader = require("react-bootstrap").PageHeader;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var SessionStore = require("../../stores/session_store");
var SessionActions = require("../../actions/session_actions");
var UserActions = require("../../actions/user_actions");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var Settings = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    var user = SessionStore.getClient();

    return { username: user.username, email: user.email };
  },

  componentWillMount: function () {
    if (SessionStore.isLoggedIn()) {
      var username = SessionStore.getClientUsername();
      SessionActions.fetchClient(username);
    } else {
      this.props.history.pushState(null, "/");
    }
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  shouldComponentUpdate: function () {
    return SessionStore.isLoggedIn();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    var user = SessionStore.getClient();

    this.setState({ username: user.username, email: user.email });
  },

  _handleSubmit: function (e) {
    e.preventDefault();

    if (this._isIncomplete()) { this._handleIncompleteSubmit(); }

    this._updateUser();
  },

  _updateUser: function () {
    var userId = SessionStore.getClientId();
    var userData = { username: this.state.username, email: this.state.email };

    UserActions.updateUser(userId, userData);
  },

  _validateComplete: function () {
    return (this.state.username !== "") && (this.state.email !== "");
  },

  renderSubmitButton: function () {
    var isComplete = this._validateComplete();

    if (!isComplete) {
      return <Button disabled>Update Account</Button>;
    } else {
      return <Button type="submit">Update Account</Button>;
    }
  },

  render: function () {
    return (
      <Grid>
        <PageHeader>Account Settings</PageHeader>

        <Row>
          <Col xs={ 4 } sm={ 4 } md={ 4 }>
            <form onSubmit={ this._handleSubmit }>
              <Input type="text"
                label="Username"
                placeholder="Update your username"
                valueLink={ this.linkState("username") } />

              <Input type="email"
                label="Email Address"
                placeholder="Update your email address"
                valueLink={ this.linkState("email") } />

              { this.renderSubmitButton() }
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Settings;
