var React = require("react");
var Link = require("react-router").Link;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var SessionActions = require("../../actions/session_actions");
var PlayerActions = require("../../actions/player_actions");
var TrackActions = require("../../actions/track_actions");
var PlaylistActions = require("../../actions/playlist_actions");
var AddToQueue = require("../utility/add_to_queue");
var AddToPlaylist = require("../utility/add_to_playlist");

module.exports = React.createClass({
  addToPlaylist: function () {
    if (this.props.isLoggedIn) {
      this.props.setTrackToAdd(this.props.track);
      PlaylistActions.showCreateModal();
    } else {
      SessionActions.showLoginModal();
    }
  },

  deleteButton: function () {
    return (
      <span className="btn btn-default delete"
        onClick={ this.deleteTrack }>
        <Glyphicon glyph="trash" className="delete-icon"/>
      </span>
    );
  },

  deleteTrack: function () {
    this.props.setTrackToDelete(this.props.track);
    TrackActions.showDeleteModal();
  },

  editButton: function () {
    return (
      <span className="btn btn-default edit-track"
        onClick={ this.editTrack }>
        <Glyphicon glyph="edit" className="edit-icon"/>
      </span>
    );
  },

  editTrack: function () {
    this.props.setTrackToEdit(this.props.track);
    TrackActions.showEditModal();
  },

  trackPathname: function () {
    return
  },

  playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  render: function () {
    var track = this.props.track;
    var username = this.props.username;

    return (
      <ListGroupItem className="track-index-item">
        <Row className="track-index-item">
          <Col xs={ 3 } sm={ 3 } md={ 3 } className="track-image">
            <span className="btn play-button" onClick={ this.playTrack }>
              <Glyphicon glyph="play" className="play-icon"/>
            </span>

            <Image src={ track.img_square } thumbnail />
          </Col>

          <Col xs={ 9 } sm={ 9 } md={ 9 } className="track-info">
            <section className="time">
              <p className="time">
                Added { track.time_ago }
              </p>
            </section>

            <section className="track-heading">
              <h5 className="username">
                <Link className="username" to={ "/" + username }>
                  { track.user.username }
                </Link>
              </h5>

              <h4 className="title">
                <Link className="title"
                  to={ "/" + username + "/" + track.slug }>
                  { track.title }
                </Link>
              </h4>
            </section>

            <section className="buttons">
              <AddToQueue track={ track } />
              <AddToPlaylist addToPlaylist={ this.addToPlaylist } />

              { this.props.isClient ? this.editButton() : null }
              { this.props.isClient ? this.deleteButton() : null }
            </section>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});
