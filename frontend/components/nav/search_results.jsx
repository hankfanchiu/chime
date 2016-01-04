var React = require("react");
var SearchItem = require("./search_item");

var SearchResults = React.createClass({
  trackResults: function () {
    var clearQuery = this.props.clearQuery;

    return this.props.tracks.map(function (track, idx) {
      return (
        <SearchItem key={ idx }
          clearQuery={ clearQuery }
          displayName={ track.username + ", " + track.title }
          imageUrl={ track.img_hero }
          pathname={ "/" + track.username + "/" + track.slug }
          glyph="music" />
      );
    })
  },

  userResults: function () {
    var clearQuery = this.props.clearQuery;

    return this.props.users.map(function (user, idx) {
      return (
        <SearchItem key={ idx }
          clearQuery={ clearQuery }
          displayName={ user.username }
          imageUrl={ user.avatar_hero }
          pathname={ "/" + user.username }
          glyph="user" />
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
