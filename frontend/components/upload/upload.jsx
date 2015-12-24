var React = require("react");
var TrackActions = require("../../actions/track_actions");
var TrackStore = require("../../stores/track_store");
var UploadActions = require("../../actions/upload_actions");
var UploadStore = require("../../stores/upload_store");
var UploadAudio = require("./upload_audio");
var UploadImage = require("./upload_image");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var Upload = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      title: "",
      description: "",
      img: null,
      publicUrl: UploadStore.getPublicUrl(),
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
    UploadActions.resetUploadStore();
    this.uploadListener.remove();
    this.trackListener.remove();
  },

  _onChange: function () {
    this.setState({
      publicUrl: UploadStore.getPublicUrl(),
      isUploaded: UploadStore.isUploaded(),
      newTrack: TrackStore.newTrack()
    });
  },

  _handleSubmit: function (e) {
    e.preventDefault();

    if (this.state.title === "") { return this._handleIncomplete(); }

    var formData = new FormData();

    formData.append("track[track_url]", this.state.publicUrl);
    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);
    formData.append("track[img]", this.state.img);

    TrackActions.createTrack(formData);
    UploadActions.resetUploadStore();
  },

  _handleIncomplete: function () {
    alert("Required fields missing!");
  },

  _redirectToTrack: function (track) {
    var pathname = "/" + track.user.username + "/" + track.slug;
    this.props.history.pushState(null, pathname);
  },

  _setImg: function (img) {
    this.setState({ img: img });
  },

  renderFormFields: function () {
    return (
      <div>
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
      </div>
    );
  },

  renderSubmitButton: function () {
    if (this.state.isUploaded) {
      return (
        <button className="btn btn-default" type="submit">Save</button>
      );
    } else {
      return (
        <button className="btn btn-default"
          type="submit" disabled>Save</button>
      )
    }
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6">
            <h1>Chime In</h1>

            <form className="upload-form"
              encType="multipart/form-data"
              onSubmit={ this._handleSubmit }>

              <UploadAudio isUploaded={ this.state.isUploaded } />

              <UploadImage setImg={ this._setImg } />

              { this.renderFormFields() }

              { this.renderSubmitButton() }
            </form>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Upload;
