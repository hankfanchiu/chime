var React = require("react");
var UserStore = require("../../../stores/user_store");
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

  renderTrackIndexItems: function () {
    var tracks = this.state.tracks;
    var username = this.props.params.username;

    if (tracks.length === 0) {
      return (
        <div className="tracks-index-item clear">
          This user has no tracks! :(
        </div>
      );
    } else {
      return tracks.map(function (track, idx) {
        return (
          <TracksIndexItem key={ idx }
            track={ track } username={ username } />
        );
      });
    }
  },

  render: function () {
    return (
      <div className="tracks-index clear">
        { this.renderTrackIndexItems() }
      </div>
    );
  }
});

module.exports = TracksIndex;
