var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Button = require("react-bootstrap").Button;
var PlaylistingActions = require("../../actions/playlisting_actions");
var PlaylistStore = require("../../stores/playlist_store");
var SessionStore = require("../../stores/session_store");
var LinkedStateMixin = require("react-addons-linked-state-mixin");

var PlaylistForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      title: "",
      description: ""
    };
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ playlist: PlaylistStore.getNewPlaylistPathname() });
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    this.createPlaylist();
  },

  createPlaylist: function () {

  },

  createPlaylisting: function () {
    var data = {
      playlist_id: this.props.playlist.id,
      track_id: this.props.trackId
    };

    PlaylistingActions.createPlaylisting(data);
  },

  cancel: function () {
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
          <Button onClick={ this.cancel }>Cancel</Button>

          <Button bsStyle="primary" type="submit">Create Playlist</Button>
        </Modal.Footer>
      </form>
    );
  }
});

module.exports = PlaylistForm;
