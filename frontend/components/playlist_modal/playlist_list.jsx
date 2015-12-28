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
    var addToPlaylist = this.createPlaylisting;
    var removeFromPlaylist = this.deletePlaylisting;
    var track = this.props.track;

    return this.props.playlists.map(function (playlist, idx) {
      return (
        <PlaylistListItem key={ idx }
          addToPlaylist={ addToPlaylist }
          removeFromPlaylist={ removeFromPlaylist }
          playlist={ playlist }
          track={ track } />
      );
    });
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
