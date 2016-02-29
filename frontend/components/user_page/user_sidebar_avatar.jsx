var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;
var Thumbnail = require("react-bootstrap").Thumbnail;
var UserStore = require("../../stores/user_store");
var UserActions = require("../../actions/user_actions");
var Spinner = require("../utility/spinner");

module.exports = React.createClass({
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

  handleFile: function () {
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

  render: function () {
    if (!this.props.isClient) { return this.noUpload(); }

    if (this.state.isUploadingAvatar) { return <Spinner />; }

    return (
      <div className="avatar">
        <span className="btn btn-default btn-file">
          <Glyphicon glyph="camera"/> Update avatar

          <input type="file" accept="image/*"
            ref="file" id="upload-avatar"
            onChange={ this.handleFile } />
        </span>

        <Thumbnail src={ this.props.user.avatar_square } />
      </div>
    );
  }
});
