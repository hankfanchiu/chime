var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Alert = require("react-bootstrap").Alert;
var Button = require("react-bootstrap").Button;
var TrackModalsStore = require("../../stores/track_modals_store");
var TrackActions = require("../../actions/track_actions");
var History = require("react-router").History;

var DeleteTrackModal = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      errors: TrackModalsStore.getErrors(),
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
    this.setState({
      errors: TrackModalsStore.getErrors(),
      show: TrackModalsStore.showDeleteModal()
    });
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
          { noErrors ? "" : this.errors() }

          <p>Are you sure you want to permanently delete this track?</p>

          <p>There's no undoing this delete!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.close }>Cancel</Button>

          <Button bsStyle="primary" onClick={ this.delete }>
            Delete Track
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = DeleteTrackModal;
