var React = require("react");
var Modal = require("react-bootstrap").Modal;
var Nav = require("react-bootstrap").Nav;
var NavItem = require("react-bootstrap").NavItem;
var PlaylistStore = require("../../stores/playlist_store");
var PlaylistActions = require("../../actions/playlist_actions");
var PlaylistForm = require("./playlist_form");
var PlaylistList = require("./playlist_list");

var PlaylistModal = React.createClass({
  getInitialState: function () {
    return {
      show: PlaylistStore.showModal(),
      showForm: false
    };
  },

  componentDidMount: function () {
    this.playlistListener = PlaylistStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ show: PlaylistStore.showModal() });
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
        playlists={ this.props.playlists }
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
