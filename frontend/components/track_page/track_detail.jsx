var React = require("react");
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
var EditButton = require("../utility/edit_button");
var DeleteButton = require("../utility/delete_button");

var TrackDetail = React.createClass({
  _trackDescription: function () {
    var description = this.props.track.description;

    if (description === "") {
      return "This track has no description!";
    } else {
      return description;
    }
  },

  _addToPlaylist: function () {
    if (this.props.isLoggedIn) {
      PlaylistActions.showPlaylistModal();
    } else {
      SessionActions.showLogin();
    }
  },

  _addToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  render: function () {
    var user = this.props.track.user;
    var deleteButton = <DeleteButton delete={ this._deleteTrack } />;

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
            { this._trackDescription() }
          </p>
        </Col>

        <Col xs={ 4 } sm={ 4 } md={ 4 }>
          <section className="track-buttons clear">
            <AddToQueue addToQueue={ this._addToQueue } />
            <AddToPlaylist addToPlaylist={ this._addToPlaylist } />

            { this.props.isLoggedIn ? <EditButton /> : "" }
            { this.props.isLoggedIn ? deleteButton : "" }
          </section>
        </Col>
      </Row>
    );
  }
});

module.exports = TrackDetail;
