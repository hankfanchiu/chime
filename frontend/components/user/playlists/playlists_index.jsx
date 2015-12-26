var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var UserStore = require("../../../stores/user_store");
var PlaylistsIndexItem = require("./playlists_index_item");

var PlaylistsIndex = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    var username = this.props.params.username;

    return { playlists: UserStore.getPlaylists(username) };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStatesFromStore());
  },

  renderNoPlaylists: function () {
    return (
      <ListGroup>
        <ListGroupItem>
          This user has no playlists! :(
        </ListGroupItem>
      </ListGroup>
    );
  },

  renderPlaylistsIndexItems: function () {
    var username = this.props.params.username;

    return this.state.playlists.map(function (playlist, idx) {
      return (
        <PlaylistsIndexItem key={ idx }
          playlist={ playlist } username={ username } />
      );
    });
  },

  render: function () {
    if (this.state.playlists.length === 0) { return this.renderNoPlaylists(); }

    return (
      <ListGroup>
        { this.renderPlaylistsIndexItems() }
      </ListGroup>
    );
  }
});

module.exports = PlaylistsIndex;
