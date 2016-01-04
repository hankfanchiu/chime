var React = require("react");
var Modal = require("react-bootstrap").Modal;
var ListGroup = require("react-bootstrap").ListGroup;
var Button = require("react-bootstrap").Button;
var PlaylistingActions = require("../../actions/playlisting_actions");
var PlaylistListItem = require("./playlist_list_item");

var PlaylistList = React.createClass({
  createPlaylisting: function (ids) {
    PlaylistingActions.createPlaylisting(ids);
  },

  deletePlaylisting: function (ids) {
    PlaylistingActions.deletePlaylisting(ids);
  },

  sadMessage: function () {
    return (
      <p>You have no playlists! Create a playlist to add this track.</p>
    );
  },

  playlistList: function () {
    var playlistList = [];
    var listItem, playlist;

    Object.keys(this.props.playlists).forEach(function (slug) {
      playlist = this.props.playlists[slug];
      listItem = (
        <PlaylistListItem key={ playlist.id }
          close={ this.props.close }
          addToPlaylist={ this.createPlaylisting }
          removeFromPlaylist={ this.deletePlaylisting }
          playlist={ playlist }
          track={ this.props.track } />
      );

      playlistList.push(listItem);
    }.bind(this));

    return <ListGroup>{ playlistList }</ListGroup>;
  },

  render: function () {
    return (
      <div>
        <Modal.Body>
          { this.props.playlists ? this.playlistList() : this.sadMessage()}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.props.close }>Close</Button>
        </Modal.Footer>
      </div>
    );
  }
});

module.exports = PlaylistList;
