var React = require("react");
var UserStore = require("../../../stores/user_store");
var PlaylistsIndexItem = require("./playlists_index_item");

var PlaylistsIndex = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    return { playlists: UserStore.getPlaylists() };
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

  renderPlaylistsIndexItems: function () {
    var playlists = this.state.playlists;
    var username = this.props.params.username;

    if (playlists.length === 0) {
      return (
        <div className="playlists-index-item clear">
          This user has no playlists! :(
        </div>
      );
    } else {
      return playlists.map(function (playlist, idx) {
        return (
          <PlaylistsIndexItem key={ idx }
            playlist={ playlist } username={ username } />
        );
      });
    }
  },

  render: function () {
    return (
      <div className="playlists-index clear">
        { this.renderPlaylistsIndexItems() }
      </div>
    );
  }
});

module.exports = PlaylistsIndex;
