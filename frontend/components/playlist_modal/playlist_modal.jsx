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
    var state = this.getStateFromStore();
    state.showForm = false;

    return state;
  },

  getStateFromStore: function () {
    var username = this.props.username;
    var show = PlaylistStore.showModal();
    var playlists = PlaylistStore.getPlaylistsByUsername(username);

    return { show: show, playlists: playlists };
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _handleSelect: function (selectKey) {
    this.setState({ showForm: selectKey });
  },

  close: function () {
    this.setState({ showForm: false });
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
