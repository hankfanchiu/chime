var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var SessionStore = require("../../../stores/session_store");
var TrackStore = require("../../../stores/track_store");
var PlaylistModal = require("../../playlist_modal/playlist_modal");
var TracksIndexItem = require("./tracks_index_item");

var TracksIndex = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var username = this.props.params.username;

    return {
      tracks: TrackStore.getTracksByUsername(username),
      clientUsername: SessionStore.getClientUsername(),
      isLoggedIn: SessionStore.isLoggedIn()
    };
  },

  componentDidMount: function () {
    this.trackListener = TrackStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.trackListener.remove();
    this.sessionListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  _setTrackToAdd: function (track) {
    this.setState({ trackToAdd: track });
  },

  renderNoTracks: function () {
    return (
      <ListGroup>
        <ListGroupItem>This user has no tracks! :(</ListGroupItem>
      </ListGroup>
    );
  },

  renderTrackIndexItems: function () {
    var trackIndexItems = [];
    var indexItem, track;

    Object.keys(this.state.tracks).forEach(function (slug) {
      track = this.state.tracks[slug];
      indexItem = (
        <TracksIndexItem key={ track.id }
          track={ track }
          username={ this.props.params.username }
          setTrackToAdd={ this._setTrackToAdd }
          isLoggedIn={ this.state.isLoggedIn } />
      );

      trackIndexItems.push(indexItem);
    }.bind(this));

    return trackIndexItems;
  },

  render: function () {
    var trackCount = Object.keys(this.state.tracks).length;

    if (trackCount === 0) { return this.renderNoTracks(); }

    return (
      <ListGroup>
        { this.renderTrackIndexItems() }

        <PlaylistModal track={ this.state.trackToAdd }
          clientUsername={ this.state.clientUsername } />
      </ListGroup>
    );
  }
});

module.exports = TracksIndex;
