var React = require("react");
var PlaylistsIndexItem = require("./playlists_index_item");

var PlaylistsIndex = React.createClass({
  playlistsIndexItems: function () {
    return this.props.playlists.map(function (playlist, idx) {
      return <PlaylistsIndexItem key={ idx } playlist={ playlist } />;
    });
  },

  render: function () {
    return (
      <div className="playlists-index clear">

        { this.playlistsIndexItems() }

      </div>
    );
  }
});

module.exports = PlaylistsIndex;
