var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var SessionStore = require("../../stores/session_store");
var PlaylistStore = require("../../stores/playlist_store");
var PlaylistActions = require("../../actions/playlist_actions");
var PlaylistForm = require("./playlist_form");
var PlaylistList = require("./playlist_list");

var PlaylistModal = React.createClass({
  getInitialState: function () {
    return {
      show: PlaylistStore.showModal(),
      showForm: false,
      playlists: SessionStore.getClientPlaylists()
    };
  },

  componentDidMount: function () {
    this.playlistListener = PlaylistStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.playlistListener.remove();
    this.sessionListener.remove();
  },

  _onChange: function () {
    this.setState({
      show: PlaylistStore.showModal(),
      playlists: SessionStore.getClientPlaylists()
    });
  },

  _handleSelect: function (selectKey) {
    this.setState({ showForm: selectKey });
  },

  close: function () {
    PlaylistActions.closePlaylistModal();
  },

  renderForm: function () {
    return <PlaylistForm close={ this.close } track={ this.props.track } />;
  },

  renderList: function () {
    return (
      <PlaylistList close={ this.close }
        playlists={ this.state.playlists }
        track={ this.props.track } />
    );
  },

  render: function () {
    return (
      <Modal onHide={ this.close } show={ this.state.show }>
        <Modal.Header closeButton>
          <Modal.Title>
            <Nav bsStyle="pills"
              activeKey={ this.state.showForm }
              onSelect={ this._handleSelect }>

              <NavItem eventKey={ false }>Add to playlist</NavItem>
              <NavItem eventKey={ true }>Create new playlist</NavItem>
            </Nav>
          </Modal.Title>
        </Modal.Header>

        { this.state.showForm ? this.renderForm() : this.renderList() }
      </Modal>
    );
  }
});

module.exports = PlaylistModal;
