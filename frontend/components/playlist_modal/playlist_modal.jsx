var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var PlaylistModalsStore = require("../../stores/playlist_modals_store");
var PlaylistStore = require("../../stores/playlist_store");
var PlaylistActions = require("../../actions/playlist_actions");
var PlaylistForm = require("./playlist_form");
var PlaylistList = require("./playlist_list");

module.exports = React.createClass({
  getInitialState: function () {
    var state = this.getStateFromStore();
    state.showForm = false;

    return state;
  },

  getStateFromStore: function () {
    var clientUsername = this.props.clientUsername;
    var show = PlaylistModalsStore.showCreateModal();
    var playlists = PlaylistStore.getPlaylistsByUsername(clientUsername);

    return { show: show, playlists: playlists };
  },

  componentDidMount: function () {
    this.modalListener = PlaylistModalsStore.addListener(this._onChange);
    this.playlistListener = PlaylistStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.modalListener.remove();
    this.playlistListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _handleSelect: function (selectKey) {
    this.setState({ showForm: selectKey });
  },

  close: function () {
    this.setState({ showForm: false });
    PlaylistActions.closeCreateModal();
  },

  form: function () {
    return <PlaylistForm close={ this.close } track={ this.props.track } />;
  },

  list: function () {
    return (
      <PlaylistList close={ this.close }
        playlists={ this.state.playlists }
        track={ this.props.track } />
    );
  },

  render: function () {
    return (
      <Modal onHide={ this.close }
        dialogClassName="playlist-modal"
        show={ this.state.show }>

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

        { this.state.showForm ? this.form() : this.list() }
      </Modal>
    );
  }
});
