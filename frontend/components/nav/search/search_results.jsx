var React = require("react");
var SearchItem = require("./search_item");

var SearchResults = React.createClass({
  trackResults: function () {
    var clearResults = this.props.clearResults;

    return this.props.tracks.map(function (track, idx) {
      return (
        <SearchItem key={ idx }
          displayName={ track.username + ", " + track.title }
          imageUrl={ track.img_hero }
          type="track"
          pathname={ "/" + track.username + "/" + track.slug }
          clearResults={ clearResults } />
      );
    })
  },

  userResults: function () {
    var clearResults = this.props.clearResults;

    return this.props.users.map(function (user, idx) {
      return (
        <SearchItem key={ idx }
          displayName={ user.username }
          imageUrl={ user.avatar_hero }
          type="user"
          pathname={ "/" + user.username }
          clearResults={ clearResults } />
      );
    })
  },

  render: function () {
    return (
      <figure className="search-results">

        { this.userResults() }

        { this.trackResults() }

      </figure>
    );
  }
});

module.exports = SearchResults;
