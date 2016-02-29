var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var TrackModalsStore = require("../../stores/track_modals_store");
var TrackActions = require("../../actions/track_actions");
var UpdateTrackImage = require("../utility/update_track_image");
var Errors = require("../utility/errors");

module.exports = React.createClass({
  getInitialState: function () {
    return {
      disabled: true,
      errors: TrackModalsStore.getErrors(),
      isUpdating: TrackModalsStore.isUpdating(),
      show: TrackModalsStore.showEditModal()
    };
  },

  componentDidMount: function () {
    this.listenerToken = TrackModalsStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var track = nextProps.track;

    if (track) {
      this.setState({
        title: track.title,
        description: track.description,
        imgUrl: track.img_square
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
    return (this.state.isUpdating ? "Updating Track..." : "Update Track");
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

  _setState: function (state) {
    this.setState(state);
  },

  close: function () {
    TrackActions.closeEditModal();
  },

  titleLabel: function () {
    return <span className="required-label">Title</span>;
  },

  update: function () {
    var trackId = this.props.track.id;
    var formData = new FormData();

    formData.append("track[title]", this.state.title);
    formData.append("track[description]", this.state.description);

    if (this.state.img) {
      formData.append("track[img]", this.state.img);
    }

    TrackActions.updateTrack(trackId, formData);
  },

  render: function () {
    return (
      <Modal onHide={ this.close }
        dialogClassName="edit-track-modal"
        show={ this.state.show }>

        <Modal.Header closeButton>
          <Modal.Title>Edit Track</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Errors errors={ this.state.errors } />

          <Row>
            <Col xs={ 5 } sm={ 5 } md={ 5 }>
              <UpdateTrackImage imgUrl={ this.state.imgUrl }
                setState={ this._setState } />
            </Col>

            <Col xs={ 7 } sm={ 7 } md={ 7 }>
              <Input type="text"
                label={ this.titleLabel() }
                ref="title"
                placeholder="Change your track title"
                help="Changing your track title will also change its URL!"
                value={ this.state.title }
                onChange={ this._handleTitleChange } />

              <Input type="textarea"
                label="Description"
                ref="description"
                rows="4"
                id="track-description"
                placeholder="Oops! Your track has no description. Enter something to describe your track."
                value={ this.state.description }
                onChange={ this._handleDescriptionChange } />
            </Col>
          </Row>
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
