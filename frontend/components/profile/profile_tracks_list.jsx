var React = require("react");
var ProfileTracksListItem = require("./profile_tracks_list_item");

var ProfileTracksList = React.createClass({
  profileTracksListItems: function () {
    return this.props.tracks.map(function (track, idx) {
      return <ProfileTracksListItem key={ idx } track={ track } />;
    });
  },

  render: function () {
    return (
      <div className="profile-tracks-list clear">

        { this.profileTracksListItems() }

      </div>
    );
  }
});

module.exports = ProfileTracksList;
