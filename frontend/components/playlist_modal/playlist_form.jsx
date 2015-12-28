var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;
var Glyphicon = require("react-bootstrap").Modal;
var PlaylistingActions = require("../../actions/playlisting_actions");
var PlaylistStore = require("../../stores/playlist_store");
var SessionStore = require("../../stores/session_store");

var PlaylistForm = React.createClass({
  getInitialState: function () {
    return {
      title: "",
      description: ""
    };
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  _onChange: function () {
    this.setState({
      playlists: SessionStore.getClientPlaylists()
    });
  },

  _handleSelect: function (selectKey) {
    this.setState({ showForm: selectKey });
  },

  _handleSubmit: function (e) {
    e.preventDefault();

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

  close: function () {
    PlaylistActions.closePlaylistModal();
  },

  saveButton: function () {
    return (
      <Button bsStyle="primary"
        type="submit"
        onClick={ this.createPlaylist }>
        Save
      </Button>
    );
  },

  render: function () {
    return (
      <form onSubmit={ this._handleSubmit }>
        <Modal.Body>
          Nothing
        </Modal.Body>

        <Modal.Footer>
          Nothing
        </Modal.Footer>
      </form>
    );
  }
});

module.exports = PlaylistForm;
