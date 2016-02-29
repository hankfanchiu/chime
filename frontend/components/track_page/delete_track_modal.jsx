var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Button = require("react-bootstrap").Button;
var TrackModalsStore = require("../../stores/track_modals_store");
var TrackActions = require("../../actions/track_actions");
var History = require("react-router").History;
var Errors = require("../utility/errors");

module.exports = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {
      errors: TrackModalsStore.getErrors(),
      isDeleting: TrackModalsStore.isDeleting(),
      show: TrackModalsStore.showDeleteModal(),
      trackDeleted: TrackModalsStore.getTrackDeleted()
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

    this._redirectIfDeleted();
  },

  _buttonState: function () {
    return (this.state.isDeleting ? "Deleting Track..." : "Delete Track");
  },

  _redirectIfDeleted: function () {
    var trackDeleted = this.state.trackDeleted;

    if (trackDeleted) {
      var pathname = "/" + this.username;

      setTimeout(function () {
        this.history.pushState(null, pathname);
      }.bind(this), 300);
    }
  },

  close: function () {
    TrackActions.closeDeleteModal();
  },

  delete: function () {
    TrackActions.deleteTrack(this.props.track.id);
  },

  render: function () {
    return (
      <Modal bsSize="small" onHide={ this.close } show={ this.state.show }>
        <Modal.Header closeButton>
          <Modal.Title>Delete Track</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Errors errors={ this.state.errors } isGeneric={ true } />

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
