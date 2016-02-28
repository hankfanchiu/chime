var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var PlaylistModalsStore = require("../../stores/playlist_modals_store");
var PlaylistActions = require("../../actions/playlist_actions");
var AddedTrack = require("./added_track");
var LinkedStateMixin = require("react-addons-linked-state-mixin");
var History = require("react-router").History;

var PlaylistForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return {
      title: "",
      description: ""
    };
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistModalsStore.addListener(this._onChange);
  },

  componentDidUpdate: function () {
    var pathname = this.state.pathname;


    if (pathname) {
      this.setState(this.getInitialState());
      this.history.pushState(null, pathname);
    }
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({
      isSaving: PlaylistModalsStore.isSaving(),
      pathname: PlaylistModalsStore.getUserPlaylistPathname(),
    });
  },

  _buttonState: function () {
    return (this.state.isSaving ? "Saving..." : "Save");
  },

  _disabled: function () {
    return (this.state.isSaving) || (this.state.title === "");
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

  titleLabel: function () {
    return <span className="required-label">Title</span>;
  },

  render: function () {
    return (
      <form onSubmit={ this._handleSubmit }>
        <Modal.Body>
          <Input type="text"
            label={ this.titleLabel() }
            placeholder="Name your new playlist"
            valueLink={ this.linkState("title") } />

          <Input type="textarea"
            label="Description"
            id="playlist-description"
            rows="5"
            placeholder="Describe your new playlist"
            valueLink={ this.linkState("description") } />

          <AddedTrack track={ this.props.track } />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.reset }>Cancel</Button>

          <Button bsStyle="primary"
            disabled={ this._disabled() }
            type="submit">

            { this._buttonState() }
          </Button>
        </Modal.Footer>
      </form>
    );
  }
});

module.exports = PlaylistForm;
