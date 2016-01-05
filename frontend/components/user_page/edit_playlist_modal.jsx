var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Alert = require("react-bootstrap").Alert;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var Thumbnail = require("react-bootstrap").Thumbnail;
var PlaylistModalsStore = require("../../stores/playlist_modals_store");
var PlaylistActions = require("../../actions/playlist_actions");

var EditPlaylistModal = React.createClass({
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
      this.setState({
        title: playlist.title,
        description: playlist.description
      });
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

  _handleDescriptionChange: function () {
    var description = this.refs.description.getValue();

    this.setState({ disabled: false, description: description });
  },

  _handleTitleChange: function () {
    var title = this.refs.title.getValue();

    this.setState({ disabled: false, title: title });
  },

  close: function () {
    PlaylistActions.closeEditModal();
  },

  errors: function () {
    if (this.state.errors.length === 1) {
      return <Alert bsStyle="danger">{ this.state.errors }</Alert>;
    }

    var errorList = this.state.errors.map(function (error, idx) {
      return <li key={ idx }>{ error }</li>;
    });

    return (
      <Alert bsStyle="danger">
        <ul>{ errorList }</ul>
      </Alert>
    );
  },

  titleLabel: function () {
    return <span className="required-label">Title</span>;
  },

  update: function () {
    var playlistId = this.props.playlist.id;
    var formData = new FormData();

    formData.append("playlist[title]", this.state.title);
    formData.append("playlist[description]", this.state.description);

    PlaylistActions.updatePlaylist(playlistId, formData);
  },

  render: function () {
    var noErrors = (this.state.errors.length === 0);

    return (
      <Modal onHide={ this.close }
        dialogClassName="edit-playlist-modal"
        show={ this.state.show }>

        <Modal.Header closeButton>
          <Modal.Title>Edit Playlist</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { noErrors ? "" : this.errors() }

          <Input type="text"
            label={ this.titleLabel() }
            ref="title"
            placeholder="Update your playlist title"
            help="Changing your playlist title will also change its URL!"
            value={ this.state.title }
            onChange={ this._handleTitleChange } />

          <Input type="textarea"
            label="Description"
            ref="description"
            rows="4"
            id="playlist-description"
            placeholder="Oops! Your playlist has no description. Enter something to describe your playlist."
            value={ this.state.description }
            onChange={ this._handleDescriptionChange } />
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

module.exports = EditPlaylistModal;
