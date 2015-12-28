var React = require("react");
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var PlayerActions = require("../../../actions/player_actions");
var PlaylistActions = require("../../../actions/playlist_actions");
var AddToQueue = require("../../utility/add_to_queue");
var AddToPlaylist = require("../../utility/add_to_playlist");
var History = require("react-router").History;

var TracksIndexItem = React.createClass({
  mixins: [History],

  _pushState: function (pathname) {
    this.history.pushState(null, pathname);
  },

  playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  addToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  addToPlaylist: function () {
    this.props.setTrackToAdd(this.props.track);
    PlaylistActions.showPlaylistModal();
  },

  goToUser: function () {
    var pathname = "/" + this.props.username;

    this._pushState(pathname);
  },

  goToTrack: function () {
    var pathname = "/" + this.props.username + "/" + this.props.track.slug;

    this._pushState(pathname);
  },

  render: function () {
    var track = this.props.track;

    return (
      <ListGroupItem>
        <Row>
          <Col xs={ 3 } sm={ 3 } md={ 3 }>
            <Thumbnail src={ track.img_thumb }
              onClick={ this.playTrack } />
          </Col>

          <Col xs={ 9 } sm={ 9 } md={ 9 }>
            <div className="detail">
              <p className="username">
                <a onClick={ this.goToUser }>{ track.user.username }</a>
              </p>

              <p className="title">
                <a onClick={ this.goToTrack }>{ track.title }</a>
              </p>

              <AddToQueue addToQueue={ this.addToQueue } />
              <AddToPlaylist addToPlaylist={ this.addToPlaylist } />

            </div>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = TracksIndexItem;
