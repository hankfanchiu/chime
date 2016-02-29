var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var UploadStore = require("../../stores/upload_store");
var UploadActions = require("../../actions/upload_actions");
var TrackActions = require("../../actions/track_actions");
var UploadAudio = require("./upload_audio");
var UploadImage = require("./upload_image");
var UploadProgress = require("./upload_progress");
var Errors = require("../utility/errors");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

module.exports = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return {
      errors: UploadStore.getErrors(),
      isSaving: UploadStore.isSaving(),
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
      isSaving: UploadStore.isSaving(),
      errors: UploadStore.getErrors(),
      show: UploadStore.showModal(),
      publicUrl: UploadStore.getPublicUrl(),
      progress: UploadStore.getProgress(),
      isUploaded: UploadStore.isUploaded(),
      pathname: UploadStore.getTrackPathname()
    });

    this._redirectIfSaved();
  },

  _buttonState: function () {
    return (this.state.isSaving ? "Saving..." : "Save");
  },

  _disabled: function () {
    return (
      (this.state.isSaving) ||
      (!this.state.isUploaded) ||
      (this.state.title === "")
    );
  },

  _redirectIfSaved: function () {
    var pathname = this.state.pathname;

    if (pathname) {
      this.setState({ title: "", description: "" });

      setTimeout(function () {
        this.history.pushState(null, pathname);
      }.bind(this), 300);
    }
  },

  _setImg: function (img) {
    this.setState({ img: img });
  },

  audioUpload: function () {
    if (this.state.progress) {
      return <UploadProgress progress={ this.state.progress } />;
    } else {
      return <UploadAudio />;
    }
  },

  reset: function () {
    this.setState({ title: "", description: "" });
    UploadActions.closeUploadModal();
  },

  save: function () {
    var formData = new FormData();

    formData.append("track[track_url]", this.state.publicUrl);
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);

    if (this.state.img) {
      formData.append("track[img]", this.state.img);
    }

    TrackActions.createTrack(formData);
  },

  titleLabel: function () {
    return <span className="required-label">Title</span>;
  },

  render: function () {
    return (
      <Modal backdrop="static"
        dialogClassName="upload-modal"
        onHide={ this.reset }
        show={ this.state.show }>

        <Modal.Header closeButton>
          <Modal.Title>Chime In</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Errors errors={ this.state.errors } />

          <Row>
            <Col xs={ 5 } sm={ 5 } md={ 5 }>
              <UploadImage setImg={ this._setImg } />
            </Col>

            <Col xs={ 7 } sm={ 7 } md={ 7 }>
              <Input type="text"
                label={ this.titleLabel() }
                placeholder="Name your track"
                valueLink={ this.linkState("title") } />

              <Input type="textarea"
                label="Description"
                rows="5"
                id="track-description"
                placeholder="Describe your track"
                valueLink={ this.linkState("description") } />

              { this.audioUpload() }
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.reset }>Cancel</Button>

          <Button bsStyle="primary"
            disabled={ this._disabled() }
            onClick={ this.save }>
            { this._buttonState() }
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
