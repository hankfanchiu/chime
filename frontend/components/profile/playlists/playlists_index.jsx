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

  renderIndexStatus: function () {
    if (this.state.playlists.length === 0) {
      return (
        <h4>
          You have no playlists!&nbsp;
          <a onClick={ this._goToForm }>
            Create a playlist.
          </a>
        </h4>
      );
    } else {
      return (
        <h4>
          <a onClick={ this._goToForm }>
            <i className="fa fa-plus"></i> Create a Playlist
          </a>
        </h4>
      )
    }
  },

  renderPlaylistsIndexItems: function () {
    return this.state.playlists.map(function (playlist, idx) {
      return <PlaylistsIndexItem key={ idx } playlist={ playlist } />;
    });
  },

  render: function () {
    return (
      <div className="playlists-index clear">
        { this.renderIndexStatus() }

        { this.renderPlaylistsIndexItems() }
      </div>
    );
  }
});

module.exports = PlaylistsIndex;
