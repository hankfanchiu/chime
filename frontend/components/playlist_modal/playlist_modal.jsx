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

var PlaylistModal = React.createClass({
  getInitialState: function () {
    return {
      show: PlaylistModalStore.showModal(),
      playlists: SessionStore.getClientPlaylists(),
    };
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistModalStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
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
    this.props.close();
  },

  render: function () {
    return (
      <Modal onHide={ this.close } show={ this.state.show }>
        <Modal.Header closeButton>
          <Modal.Title>
            <Nav bsStyle="tabs"
              activeKey={ 1 }
              onSelect={ this._handleSelect }>

              <NavItem eventKey={ 1 }>Add to playlist</NavItem>
              <NavItem eventKey={ 2 }>Create new playlist</NavItem>
            </Nav>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { this.props.children }
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.close }>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});

module.exports = PlaylistModal;
