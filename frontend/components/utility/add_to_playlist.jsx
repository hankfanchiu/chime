var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;

var AddToPlaylist = React.createClass({
  addToPlaylist: function () {

  },

  render: function () {
    return (
      <span className="btn btn-default add-to-playlist"
        onClick={ this.addToPlaylist }>
        <Glyphicon glyph="th-list" className="playlist-icon"/> Add to playlist
      </span>
    );
  }
});

module.exports = AddToPlaylist;
