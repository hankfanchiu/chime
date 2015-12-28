var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Button = require("react-bootstrap").Button;
var PlaylistActions = require("../../actions/playlist_actions");
var PlaylistStore = require("../../stores/playlist_store");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

var PlaylistForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { title: "", description: "" };
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    var pathname = PlaylistStore.getNewPlaylistPathname();

    if (!pathname) { return; }

    this.setState(this.getInitialState);
    this.history.pushState(null, pathname);
  },

  _disabled: function () {
    return this.state.title === "";
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    this.createPlaylist();
  },

  createPlaylist: function () {
    var playlistData = {
      title: this.state.title,
      description: this.state.description,
      track_ids: [this.props.track.id]
    }

    PlaylistActions.createPlaylist(playlistData);
  },

  reset: function () {
    this.setState(this.getInitialState);
    this.props.close();
  },

  render: function () {
    return (
      <form onSubmit={ this._handleSubmit }>
        <Modal.Body>
          <Input type="text"
            label="Title"
            placeholder="Name your new playlist"
            valueLink={ this.linkState("title") } />

          <Input type="textarea"
            label="Description"
            placeholder="Describe your new playlist"
            valueLink={ this.linkState("description") } />

          <Row>
            <Col xs={ 2 } sm={ 2 } md={ 2 }>
              <Thumbnail src={ this.props.track.img_hero } />
            </Col>

            <Col xs={ 10 } sm={ 10 } md={ 10 }>
              <span className="track-username">
                { this.props.track.user.username }
              </span>

              <span className="track-title">
                { this.props.track.title }
              </span>
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.reset }>Cancel</Button>

          <Button bsStyle="primary"
            disabled={ this._disabled() }
            type="submit">
            Create Playlist
          </Button>
        </Modal.Footer>
      </form>
    );
  }
});

module.exports = PlaylistForm;
