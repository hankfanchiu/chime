var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Alert = require("react-bootstrap").Alert;
var Button = require("react-bootstrap").Button;
var PlaylistModalsStore = require("../../stores/playlist_modals_store");
var PlaylistActions = require("../../actions/playlist_actions");
var History = require("react-router").History;

var DeletePlaylistModal = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      errors: PlaylistModalsStore.getErrors(),
      isDeleting: PlaylistModalsStore.isDeleting(),
      show: PlaylistModalsStore.showDeleteModal()
    };
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistModalsStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var playlist = nextProps.playlist;

    if (playlist) {
      this.username = playlist.user.username;
    }
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _buttonState: function () {
    if (this.state.isDeleting) {
      return "Deleting Playlist...";
    } else {
      return "Delete Playlist";
    }
  },

  close: function () {
    PlaylistActions.closeDeleteModal();
  },

  delete: function () {
    PlaylistActions.deletePlaylist(this.props.playlist.id);
  },

  errors: function () {
    return (
      <Alert bsStyle="danger">
        An error has occurred. Please refresh the page and try again.
      </Alert>
    );
  },

  render: function () {
    var noErrors = (this.state.errors.length === 0);

    return (
      <Modal bsSize="small" onHide={ this.close } show={ this.state.show }>
        <Modal.Header closeButton>
          <Modal.Title>Delete Playlist</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { noErrors ? "" : this.errors() }

          <p>Are you sure you want to permanently delete this playlist?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.close }>Cancel</Button>

          <Button bsStyle="primary"
            disabled={ this.state.isDeleting }
            onClick={ this.delete }>
            { this._buttonState() }
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = DeletePlaylistModal;
