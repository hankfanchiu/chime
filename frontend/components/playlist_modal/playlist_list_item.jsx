var React = require("react");
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var Button = require("react-bootstrap").Button;
var SessionStore = require("../../stores/session_store");
var History = require("react-router").History;

var PlaylistListItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var playlistId = this.props.playlist.id;
    var trackId = this.props.track.id;
    var isAdded = SessionStore.playlistContainsTrack(playlistId, trackId);

    return { isAdded: isAdded };
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  goToPlaylist: function () {
    var username = SessionStore.getClientUsername();
    var slug = this.props.playlist.slug;
    var pathname = "/" + username + "/playlists/" + slug;

    this.props.close();
    this.history.pushState(null, pathname);
  },

  add: function () {
    var ids = {
      playlist_id: this.props.playlist.id,
      track_id: this.props.track.id
    };

    this.props.addToPlaylist(ids);
  },

  remove: function () {
    var ids = {
      playlist_id: this.props.playlist.id,
      track_id: this.props.track.id
    };

    this.props.removeFromPlaylist(ids);
  },

  renderAdd: function () {
    return (
      <Button bsStyle="primary" onClick={ this.add }>Add</Button>
    );
  },

  renderRemove: function () {
    return (
      <Button bsStyle="warning" onClick={ this.remove }>Remove</Button>
    );
  },

  render: function () {
    var playlist = this.props.playlist;
    var firstTrackImgUrl = playlist.tracks[0].img_thumb;

    return (
      <ListGroupItem>
        <Row>
          <Col xs={ 2 } sm={ 2 } md={ 2 }>
            <Thumbnail src={ firstTrackImgUrl } />
          </Col>

          <Col xs={ 8 } sm={ 8 } md={ 8 }>
            <p className="playlist-title">
              <a onClick={ this.goToPlaylist }>{ playlist.title }</a>
            </p>
          </Col>

          <Col xs={ 2 } sm={ 2 } md={ 2 }>
            { this.state.isAdded ? this.renderRemove() : this.renderAdd() }
          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = PlaylistListItem;
