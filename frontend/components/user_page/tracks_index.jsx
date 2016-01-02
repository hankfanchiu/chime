var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var SessionStore = require("../../stores/session_store");
var TrackStore = require("../../stores/track_store");
var PlaylistModal = require("../playlist_modal/playlist_modal");
var EditTrackModal = require("./edit_track_modal");
var DeleteTrackModal = require("./delete_track_modal");
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
      isLoggedIn: SessionStore.isLoggedIn(),
      isClient: SessionStore.isClient(username)
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

  _setTrackToEdit: function (track) {
    this.setState({ trackToEdit: track });
  },

  _setTrackToDelete: function (track) {
    this.setState({ trackToDelete: track });
  },

  noTracks: function () {
    return (
      <ListGroup>
        <ListGroupItem>This user has no tracks! :(</ListGroupItem>
      </ListGroup>
    );
  },

  trackIndexItems: function () {
    var trackIndexItems = [];
    var indexItem, track;

    Object.keys(this.state.tracks).forEach(function (slug) {
      track = this.state.tracks[slug];
      indexItem = (
        <TracksIndexItem key={ track.id }
          track={ track }
          username={ this.props.params.username }
          setTrackToAdd={ this._setTrackToAdd }
          setTrackToEdit={ this._setTrackToEdit }
          setTrackToDelete={ this._setTrackToDelete }
          isLoggedIn={ this.state.isLoggedIn }
          isClient={ this.state.isClient } />
      );

      trackIndexItems.push(indexItem);
    }.bind(this));

    return trackIndexItems;
  },

  render: function () {
    if (!this.state.tracks) { return this.noTracks(); }

    return (
      <ListGroup className="tracks-index">
        { this.trackIndexItems() }

        <PlaylistModal track={ this.state.trackToAdd }
          clientUsername={ this.state.clientUsername } />

        <EditTrackModal track={ this.state.trackToEdit } />

        <DeleteTrackModal track={ this.state.trackToDelete } />
      </ListGroup>
    );
  }
});

module.exports = TracksIndex;
