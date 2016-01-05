var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;
var Thumbnail = require("react-bootstrap").Thumbnail;
var UserStore = require("../../stores/user_store");
var UserActions = require("../../actions/user_actions");

var UserSidebarAvatar = React.createClass({
  getInitialState: function () {
    return { isUploadingAvatar: UserStore.isUploadingAvatar() };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _handleFile: function () {
    var formData = new FormData();
    var img = this.refs.file.files[0];
    var clientId = this.props.client.id;

    formData.append("user[avatar]", img);

    UserActions.uploadAvatar(clientId, formData);
  },

  noUpload: function () {
    return (
      <div className="avatar">
        <Thumbnail src={ this.props.user.avatar_square } />
      </div>
    );
  },

  spinner: function () {
    return (
      <div className="sk-circle">
        <div className="sk-circle1 sk-child"></div>
        <div className="sk-circle2 sk-child"></div>
        <div className="sk-circle3 sk-child"></div>
        <div className="sk-circle4 sk-child"></div>
        <div className="sk-circle5 sk-child"></div>
        <div className="sk-circle6 sk-child"></div>
        <div className="sk-circle7 sk-child"></div>
        <div className="sk-circle8 sk-child"></div>
        <div className="sk-circle9 sk-child"></div>
        <div className="sk-circle10 sk-child"></div>
        <div className="sk-circle11 sk-child"></div>
        <div className="sk-circle12 sk-child"></div>
      </div>
    )
  },

  render: function () {
    if (!this.props.isClient) { return this.noUpload(); }
    
    if (this.state.isUploadingAvatar) { return this.spinner(); }

    return (
      <div className="avatar">
        <span className="btn btn-default btn-file">
          <Glyphicon glyph="camera"/> Update avatar

          <input type="file" accept="image/*"
            ref="file" id="upload-avatar"
            onChange={ this._handleFile } />
        </span>

        <Thumbnail src={ this.props.user.avatar_square } />
      </div>
    );
  }
});

module.exports = UserSidebarAvatar;
