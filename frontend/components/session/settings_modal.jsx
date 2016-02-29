var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var SettingsModalStore = require("../../stores/settings_modal_store");
var SessionStore = require("../../stores/session_store");
var UserActions = require("../../actions/user_actions");
var Errors = require("../utility/errors");
var SettingsAvatar = require("./settings_avatar");

module.exports = React.createClass({
  getInitialState: function () {
    var client = SessionStore.getClient();

    return {
      errors: SettingsModalStore.getErrors(),
      isSaving: SettingsModalStore.isSaving(),
      show: SettingsModalStore.showModal(),
      disabled: true,
      clientId: client.id,
      email: client.email,
      description: client.description,
      avatarUrl: client.avatar_square
     };
  },

  componentDidMount: function () {
    this.listenerToken = SettingsModalStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _buttonState: function () {
    return (this.state.isSaving ? "Updating Account..." : "Update Account");
  },

  _disabled: function () {
    return (
      (this.state.isSaving) ||
      (this.state.email === "") ||
      (this.state.disabled)
    );
  },

  _handleEmailChange: function () {
    var email = this.refs.email.getValue();
    this.setState({ disabled: false, email: email });
  },

  _handleDescriptionChange: function () {
    var description = this.refs.description.getValue();
    this.setState({ disabled: false, description: description });
  },

  _setState: function (state) {
    this.setState(state);
  },

  close: function () {
    UserActions.closeSettingsModal();
  },

  emailLabel: function () {
    return <span className="required-label">Email Address</span>;
  },

  updateUser: function () {
    var formData = new FormData();

    formData.append("user[email]", this.state.email);
    formData.append("user[description]", this.state.description);

    if (this.state.img) {
      formData.append("user[avatar]", this.state.img);
    }

    UserActions.updateUser(this.state.clientId, formData);
  },

  render: function () {
    return (
      <Modal dialogClassName="settings-modal"
        onHide={ this.close }
        show={ this.state.show }>

        <Modal.Header closeButton>
          <Modal.Title>Account Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Errors errors={ this.state.errors } />

          <Row>
            <Col xs={ 5 } sm={ 5 } md={ 5 }>
              <SettingsAvatar avatarUrl={ this.state.avatarUrl }
                setState={ this._setState } />
            </Col>

            <Col xs={ 7 } sm={ 7 } md={ 7 }>
              <Input type="email"
                label={ this.emailLabel() }
                ref="email"
                value={ this.state.email }
                placeholder="Update your email address"
                onChange={ this._handleEmailChange } />

              <Input type="textarea"
                rows="5"
                id="user-profile-description"
                label="Profile Description"
                ref="description"
                value={ this.state.description }
                placeholder="Let everyone know more about you!"
                onChange={ this._handleDescriptionChange } />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.close }>Cancel</Button>

          <Button bsStyle="primary"
            disabled={ this._disabled() }
            onClick={ this.updateUser }>
            { this._buttonState() }
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
