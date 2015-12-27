var React = require("react");
var Modal = require("react-bootstrap").Modal;
var PageHeader = require("react-bootstrap").PageHeader;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Glyphicon = require("react-bootstrap").Glyphicon;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var SettingsStore = require("../../stores/settings_store");
var SessionStore = require("../../stores/session_store");
var UserActions = require("../../actions/user_actions");

var Settings = React.createClass({
  getInitialState: function () {
    var user = SessionStore.getClient();

    return {
      show: SettingsStore.showModal(),
      disabled: true,
      user: user,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatar_square
     };
  },

  componentDidMount: function () {
    this.listenerToken = SettingsStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _handleFile: function () {
    var reader = new FileReader();
    var img = this.refs.file.files[0];

    if (img === null) { return; }

    reader.onloadend = function () {
      this.setState({ avatarUrl: reader.result });
    }.bind(this);

    reader.readAsDataURL(img);
    this.setState({ disabled: false, img: img });
  },

  _handleEmailChange: function () {
    var email = this.refs.email.getValue();
    this.setState({ disabled: false, email: email });
  },

  _handleUsernameChange: function () {
    var username = this.refs.username.getValue();
    this.setState({ disabled: false, username: username });
  },

  _updateUser: function () {
    var formData = new FormData();

    formData.append("user[username]", this.state.username);
    formData.append("user[email]", this.state.email);

    if (this.state.img) {
      formData.append("user[avatar]", this.state.img);
    }

    UserActions.updateUser(this.state.user.id, formData);
  },

  close: function () {
    UserActions.closeSettings();
  },

  disabled: function () {
    return (
      (this.state.username === "") ||
      (this.state.email === "") ||
      (this.state.disabled)
    );
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
          <Row>
            <Col xs={ 5 } sm={ 5 } md={ 5 }>
              <div className="avatar">
                <span className="btn btn-default btn-file">
                  <Glyphicon glyph="camera"/> Update avatar

                  <input type="file" accept="image/*" ref="file"
                    onChange={ this._handleFile } />
                </span>

                <Thumbnail src={ this.state.avatarUrl } />
              </div>
            </Col>

            <Col xs={ 7 } sm={ 7 } md={ 7 }>
              <Input type="text"
                label="Username"
                ref="username"
                value={ this.state.username }
                placeholder="Update your username"
                onChange={ this._handleUsernameChange } />

              <Input type="email"
                label="Email Address"
                ref="email"
                value={ this.state.email }
                placeholder="Update your email address"
                onChange={ this._handleEmailChange } />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.close }>Cancel</Button>

          <Button bsStyle="primary"
            disabled={ this.disabled() }
            onClick={ this._updateUser }>
            Update Account
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = Settings;
