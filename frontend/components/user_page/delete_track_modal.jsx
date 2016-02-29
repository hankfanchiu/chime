var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Alert = require("react-bootstrap").Alert;
var Button = require("react-bootstrap").Button;
var TrackModalsStore = require("../../stores/track_modals_store");
var TrackActions = require("../../actions/track_actions");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      errors: TrackModalsStore.getErrors(),
      isDeleting: TrackModalsStore.isDeleting(),
      show: TrackModalsStore.showDeleteModal()
    };
  },

  componentDidMount: function () {
    this.listenerToken = TrackModalsStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var track = nextProps.track;

    if (track) {
      this.username = track.user.username;
    }
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  _buttonState: function () {
    return (this.state.isDeleting ? "Deleting Track..." : "Delete Track");
  },

  close: function () {
    TrackActions.closeDeleteModal();
  },

  delete: function () {
    TrackActions.deleteTrack(this.props.track.id);
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
          <Modal.Title>Delete Track</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { noErrors ? null : this.errors() }

          <p>
            Are you sure you want to permanently delete this track?
          </p>

          <p>
            You will no longer have access to the uploaded audio and image files once the track is deleted.
          </p>
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
