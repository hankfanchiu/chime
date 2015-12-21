var React = require("react");
var UserStore = require("../../../stores/user_store");
var TracksIndexItem = require("./tracks_index_item");

var TracksIndex = React.createClass({
  getInitialState: function () {
    return { tracks: UserStore.getTracks() };
  },

  renderTracksIndexItems: function () {
    if (this.state.tracks.length === 0) {
      return (
        <div className="tracks-index-item clear">
          This user has no tracks! :(
        </div>
      );
    } else {
      return this.state.tracks.map(function (track, idx) {
        return <TracksIndexItem key={ idx } track={ track } />;
      });
    }
  },

  render: function () {
    return (
      <div className="tracks-index clear">
        { this.renderTracksIndexItems() }
      </div>
    );
  }
});

module.exports = TracksIndex;
