var React = require("react");
var Grid = require("react-bootstrap").Grid;
var PageHeader = require("react-bootstrap").PageHeader;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Glyphicon = require("react-bootstrap").Glyphicon;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var SessionStore = require("../../stores/session_store");
var SessionActions = require("../../actions/session_actions");
var UserActions = require("../../actions/user_actions");

var Settings = React.createClass({
  getInitialState: function () {
    var user = SessionStore.getClient();

    return {
      disabled: true,
      user: user,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatar_square
     };
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
    this.setState(this.getInitialState);
  },

  _disabled: function () {
    return (!this._validateComplete()) || (this.state.disabled);
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

  _validateComplete: function () {
    return (this.state.username !== "") && (this.state.email !== "");
  },

  render: function () {
    return (
      <Grid>
        <PageHeader>Account Settings</PageHeader>

        <Row>
          <Col xs={ 4 } sm={ 4 } md={ 4 }>
            <div className="avatar">
              <span className="btn btn-default btn-file">
                <Glyphicon glyph="camera"/> Update avatar

                <input type="file" accept="image/*"
                  ref="file" id="upload-avatar"
                  onChange={ this._handleFile } />
              </span>

              <Thumbnail src={ this.state.avatarUrl } />
            </div>
          </Col>

          <Col xs={ 4 } sm={ 4 } md={ 4 }>
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

            <Button bsStyle="primary"
              disabled={ this._disabled() }
              onClick={ this._updateUser }>
              Update Account
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = Settings;
