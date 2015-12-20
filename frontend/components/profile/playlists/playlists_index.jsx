var React = require("react");
var ProfileStore = require("../../../stores/profile_store");
var PlaylistsIndexItem = require("./playlists_index_item");

var PlaylistsIndex = React.createClass({
  getInitialState: function () {
    return { playlists: ProfileStore.getPlaylists() };
  },

  componentDidMount: function () {
    this.listenerToken = ProfileStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ playlists: ProfileStore.getPlaylists() });
  },

  renderPlaylistsIndexItems: function () {
    if (this.state.playlists.length === 0) {
      return <p>You have no playlists!</p>;
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
