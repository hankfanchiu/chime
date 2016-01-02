var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Button = require("react-bootstrap").Button;
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");
var History = require("react-router").History;

var DeleteTrackModal = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { show: TrackStore.showDeleteModal() };
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
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
    this.setState(this.getStateFromStore());

    this._redirectIfDeleted();
  },

  _redirectIfDeleted: function () {
    var trackDeleted = TrackStore.getTrackDeleted();

    if (trackDeleted) {
      var pathname = "/" + this.username;
      var pushState = this.history.pushState.bind(this, null, pathname);

      setTimeout(pushState, 300);
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
