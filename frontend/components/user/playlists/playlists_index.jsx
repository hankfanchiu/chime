var React = require("react");
var UserStore = require("../../../stores/user_store");
var PlaylistsIndexItem = require("./playlists_index_item");

var PlaylistsIndex = React.createClass({
  getInitialState: function () {
    return { playlists: UserStore.getPlaylists() };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ playlists: UserStore.getPlaylists() });
  },

  renderPlaylistsIndexItems: function () {
    if (this.state.playlists.length === 0) {
      return (
        <div className="playlists-index-item clear">
          This user has no playlists! :(
        </div>
      );
    } else {
      return this.state.playlists.map(function (playlist, idx) {
        return <PlaylistsIndexItem key={ idx } playlist={ playlist } />;
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
