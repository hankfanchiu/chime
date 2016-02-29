var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Button = require("react-bootstrap").Button;
var PlaylistModalsStore = require("../../stores/playlist_modals_store");
var PlaylistActions = require("../../actions/playlist_actions");
var Errors = require("../utility/errors");

module.exports = React.createClass({
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

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _buttonState: function () {
    return (this.state.isDeleting ? "Deleting Playlist..." : "Delete Playlist");
  },

  close: function () {
    PlaylistActions.closeDeleteModal();
  },

  delete: function () {
    PlaylistActions.deletePlaylist(this.props.playlist.id);
  },

  render: function () {
    return (
      <Modal bsSize="small" onHide={ this.close } show={ this.state.show }>
        <Modal.Header closeButton>
          <Modal.Title>Delete Playlist</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Errors errors={ this.state.errors } />

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
