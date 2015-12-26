var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Button = require("react-bootstrap").Button;
var TrackActions = require("../../actions/track_actions");
var TrackStore = require("../../stores/track_store");
var UploadActions = require("../../actions/upload_actions");
var UploadStore = require("../../stores/upload_store");
var UploadAudio = require("./upload_audio");
var UploadAudioProgress = require("./upload_audio_progress");
var UploadImage = require("./upload_image");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var UploadModal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      title: "",
      description: "",
      img: null,
      publicUrl: UploadStore.getPublicUrl(),
      progress: UploadStore.getProgress(),
      isUploaded: UploadStore.isUploaded(),
      newTrack: TrackStore.newTrack()
    };
  },

  componentDidMount: function () {
    this.uploadListener = UploadStore.addListener(this._onChange);
    this.trackListener = TrackStore.addListener(this._onChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    var track = nextState.newTrack;
    if (track) {
      this._redirectToTrack(track);
    }
  },

  componentWillUnmount: function () {
    this.uploadListener.remove();
    this.trackListener.remove();
  },

  _onChange: function () {
    this.setState({
      publicUrl: UploadStore.getPublicUrl(),
      progress: UploadStore.getProgress(),
      isUploaded: UploadStore.isUploaded(),
      newTrack: TrackStore.newTrack()
    });
  },

  _cancel: function () {
    UploadActions.resetUploadStore();
    this.props.close();
  },

  _handleSubmit: function (e) {
    e.preventDefault();
  },

  _handleIncomplete: function () {
    alert("Required fields missing!");
  },

  _redirectToTrack: function (track) {
    var pathname = "/" + track.user.username + "/" + track.slug;
    this.props.history.pushState(null, pathname);
  },

  _save: function () {
    if (this.state.title === "") { return this._handleIncomplete(); }

    var formData = new FormData();

    formData.append("track[track_url]", this.state.publicUrl);
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);

    if (this.state.img) {
      formData.append("track[img]", this.state.img);
    }

    TrackActions.createTrack(formData);
    UploadActions.resetUploadStore();
    this.props.close();
  },

  _setImg: function (img) {
    this.setState({ img: img });
  },

  renderAudioUpload: function () {
    if (this.state.progress) {
      return <UploadAudioProgress progress={ this.state.progress } />;
    } else {
      return <UploadAudio />;
    }
  },

  renderSubmitButton: function () {
    if (!this.state.isUploaded) {
      return <Button bsStyle="primary" disabled>Save</Button>;
    }

    return (
      <Button bsStyle="primary" onClick={ this._save }>Save</Button>
    );
  },

  render: function () {
    return (
      <Modal bsSize="large"
        onHide={ this._clearUpload }
        show={ this.props.showModal }>

        <Modal.Header closeButton>
          <Modal.Title>
            Chime In
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="upload-form"
            encType="multipart/form-data"
            onSubmit={ this._handleSubmit }>

            { this.renderAudioUpload() }

            <UploadImage setImg={ this._setImg } />

            <div className="form-group">
              <label htmlFor="upload-track-title">Title</label>

              <input type="text"
                name="title"
                className="form-control"
                id="upload-track-title"
                placeholder="Name your track"
                valueLink={ this.linkState("title") } />
            </div>

            <div className="form-group">
              <label htmlFor="upload-track-description">Description</label>

              <textarea name="description"
                className="form-control"
                id="upload-track-description"
                placeholder="Describe your track"
                valueLink={ this.linkState("description") } />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this._cancel }>Cancel</Button>

          { this.renderSubmitButton() }
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = UploadModal;
