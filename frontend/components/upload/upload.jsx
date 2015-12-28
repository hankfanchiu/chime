var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var ProgressBar = require("react-bootstrap").ProgressBar;
var Button = require("react-bootstrap").Button;
var TrackActions = require("../../actions/track_actions");
var UploadActions = require("../../actions/upload_actions");
var UploadStore = require("../../stores/upload_store");
var UploadAudio = require("./upload_audio");
var UploadImage = require("./upload_image");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

var Upload = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return {
      show: UploadStore.showModal(),
      title: "",
      description: ""
    };
  },

  componentDidMount: function () {
    this.listenerToken = UploadStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({
      show: UploadStore.showModal(),
      publicUrl: UploadStore.getPublicUrl(),
      progress: UploadStore.getProgress(),
      isUploaded: UploadStore.isUploaded()
    });

    this._redirectIfSaved();
  },

  _disabled: function () {
    return (!this.state.isUploaded) || (this.state.title === "");
  },

  _redirectIfSaved: function () {
    var pathname = UploadStore.getTrackPathname();
    var pushState = this.history.pushState.bind(this, null, pathname);

    if (!pathname) { return; }

    this.setState({ title: "", description: "" });
    setTimeout(pushState, 300);
  },

  _reset: function () {
    UploadActions.resetUploadStore();
    this.setState(this.getInitialState());
  },

  _save: function () {
    var formData = new FormData();

    formData.append("track[track_url]", this.state.publicUrl);
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);

    if (this.state.img) {
      formData.append("track[img]", this.state.img);
    }

    TrackActions.createTrack(formData);
  },

  _setImg: function (img) {
    this.setState({ img: img });
  },

  progressState: function () {
    if (this.state.progress === 100) { return "success"; }
  },

  renderAudioUpload: function () {
    if (!this.state.progress) { return <UploadAudio />; }

    return (
      <ProgressBar now={ this.state.progress } active
        bsStyle={ this.progressState() } />
    );
  },

  render: function () {
    return (
      <Modal backdrop="static"
        dialogClassName="upload-modal"
        onHide={ this._reset }
        show={ this.state.show }>

        <Modal.Header closeButton>
          <Modal.Title>Chime In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col xs={ 4 } sm={ 4 } md={ 4 }>
              <UploadImage setImg={ this._setImg } />
            </Col>

            <Col xs={ 8 } sm={ 8 } md={ 8 }>
              <Input type="text"
                label="Title"
                placeholder="Name your track"
                valueLink={ this.linkState("title") } />

              <Input type="textarea"
                label="Description"
                placeholder="Describe your track"
                valueLink={ this.linkState("description") } />

              { this.renderAudioUpload() }
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this._reset }>Cancel</Button>

          <Button bsStyle="primary"
            disabled={ this._disabled() }
            onClick={ this._save }>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = Upload;
