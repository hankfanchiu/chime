var React = require("react");
var UserStore = require("../../../stores/user_store");
var TracksIndexItem = require("./tracks_index_item");

var TracksIndex = React.createClass({
  getInitialState: function () {
    return { tracks: UserStore.getTracks() };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ tracks: UserStore.getTracks() });
  },

  renderTracks: function () {
    if (this.state.tracks.length === 0) {
      return (
        <div className="tracks-index-item clear">
          This user has no tracks! :(
        </div>
      );
    } else {
      return this.state.tracks.map(function (track) {
        return <TracksIndexItem key={ track.id } track={ track } />;
      });
    }
  },

  render: function () {
    return (
      <div className="tracks-index clear">
        { this.renderTracks() }
      </div>
    );
  }
});

module.exports = TracksIndex;
