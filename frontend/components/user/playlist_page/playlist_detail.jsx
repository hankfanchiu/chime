var React = require("react");

var PlaylistDetail = React.createClass({
  _deletePlaylisting: function () {
    var data = {
      playlist_id: this.props.playlistId,
      track_id: this.props.track.id
    };

    PlaylistingActions.deletePlaylisting(data);
  },
  
  render: function () {
    return (
      <div className="row">
        <h3>Detail</h3>
      </div>
    );
  }
});

module.exports = PlaylistDetail;
