var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Alert = require("react-bootstrap").Alert;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var Thumbnail = require("react-bootstrap").Thumbnail;
var PlaylistModalsStore = require("../../stores/playlist_modals_store");
var PlaylistActions = require("../../actions/playlist_actions");
var Errors = require("../utility/errors");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      disabled: true,
      errors: PlaylistModalsStore.getErrors(),
      isUpdating: PlaylistModalsStore.isUpdating(),
      show: PlaylistModalsStore.showEditModal()
    };
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistModalsStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var playlist = nextProps.playlist;

    if (playlist) {
      this.setState({ title: playlist.title });
    }
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _buttonState: function () {
    return (this.state.isUpdating ? "Updating Playlist..." : "Update Playlist");
  },

  _disabled: function () {
    return (
      (this.state.isUpdating) ||
      (this.state.title === "") ||
      (this.state.disabled)
    );
  },

  _handleTitleChange: function () {
    var title = this.refs.title.getValue();

    this.setState({ disabled: false, title: title });
  },

  close: function () {
    PlaylistActions.closeEditModal();
  },

  errors: function () {
    if (this.state.errors.length === 0) {
      return null;
    } else {
      return <Errors errors={ this.state.errors } />;
    }
  },

  titleLabel: function () {
    return <span className="required-label">Title</span>;
  },

  update: function () {
    var playlistId = this.props.playlist.id;
    var data = { title: this.state.title };

    PlaylistActions.updatePlaylist(playlistId, data);
  },

  render: function () {
    return (
      <Modal onHide={ this.close } show={ this.state.show } bsSize="small">
        <Modal.Header closeButton>
          <Modal.Title>Edit Playlist</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { this.errors() }

          <Input type="text"
            label={ this.titleLabel() }
            ref="title"
            placeholder="Update your playlist title"
            value={ this.state.title }
            onChange={ this._handleTitleChange } />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.close }>Cancel</Button>

          <Button bsStyle="primary"
            disabled={ this._disabled() }
            onClick={ this.update }>
            { this._buttonState() }
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
