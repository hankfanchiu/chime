var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var UserStore = require("../../../stores/user_store");
var PlaylistModal = require("../../playlist_modal/playlist_modal");
var TracksIndexItem = require("./tracks_index_item");

var TracksIndex = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    var username = this.props.params.username;

    return { tracks: UserStore.getTracks(username) };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStatesFromStore());
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
    return this.state.tracks.map(function (track, idx) {
      return (
        <TracksIndexItem key={ idx }
          track={ track }
          username={ this.props.params.username }
          setTrackToAdd={ this._setTrackToAdd } />
      );
    }.bind(this));
  },

  render: function () {
    if (this.state.tracks.length === 0) { return this.renderNoTracks(); }

    return (
      <ListGroup>
        { this.renderTrackIndexItems() }

        <PlaylistModal track={ this.state.trackToAdd } />
      </ListGroup>
    );
  }
});

module.exports = TracksIndex;
