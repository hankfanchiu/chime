var React = require("react");
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var SessionActions = require("../../actions/session_actions");
var TrackActions = require("../../actions/track_actions");
var PlaylistActions = require("../../actions/playlist_actions");
var AddToQueue = require("../utility/add_to_queue");
var AddToPlaylist = require("../utility/add_to_playlist");

var TrackDetail = React.createClass({
  trackDescription: function () {
    var track = this.props.track;

    if (!track) {
      return "";
    } else if (track.description === "") {
      return "This track has no description!";
    } else {
      return track.description;
    }
  },

  addToPlaylist: function () {
    if (this.props.isLoggedIn) {
      PlaylistActions.showCreateModal();
    } else {
      SessionActions.showLoginModal();
    }
  },

  deleteButton: function () {
    return (
      <span className="btn btn-default delete"
        onClick={ TrackActions.showDeleteModal }>
        <Glyphicon glyph="trash" className="delete-icon"/>
      </span>
    );
  },

  editButton: function () {
    return (
      <span className="btn btn-default edit-track"
        onClick={ TrackActions.showEditModal }>
        <Glyphicon glyph="edit" className="edit-icon"/>
      </span>
    );
  },

  render: function () {
    var user = this.props.user;

    if (!user) { return <Row />; }

    return (
      <Row className="track-page-detail">
        <Col xs={ 2 } sm={ 2 } md={ 2 }>
          <Image src={ user.avatar_square } thumbnail />
        </Col>

        <Col xs={ 6 } sm={ 6 } md={ 6 } className="track-description">
          <h5 className="username">
            <a className="username" onClick={ this.props.goToUser }>
              { user.username }
            </a>
          </h5>

          <p className="track-description">
            { this.trackDescription() }
          </p>
        </Col>

        <Col xs={ 4 } sm={ 4 } md={ 4 }>
          <section className="track-buttons clear">
            <AddToQueue track={ this.props.track } />
            <AddToPlaylist addToPlaylist={ this.addToPlaylist } />

            { this.props.isClient ? this.editButton() : "" }
            { this.props.isClient ? this.deleteButton() : "" }
          </section>
        </Col>
      </Row>
    );
  }
});

module.exports = TrackDetail;
