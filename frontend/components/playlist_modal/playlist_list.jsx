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

  renderPlaylists: function () {
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

    return playlistList
  },

  render: function () {
    return (
      <div>
        <Modal.Body>
          <ListGroup>
            { this.renderPlaylists() }
          </ListGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={ this.props.close }>Close</Button>
        </Modal.Footer>
      </div>
    );
  }
});

module.exports = PlaylistList;
