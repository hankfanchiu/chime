var React = require("react");
var SearchItem = require("./search_item");

var SearchResults = React.createClass({
  trackResults: function () {
    return this.props.tracks.map(function (track, idx) {
      return (
        <SearchItem key={ idx }
          displayName={ track.title }
          pathname={ "/" + track.user + "/" + track.slug } />
      );
    })
  },

  userResults: function () {
    return this.props.users.map(function (user, idx) {
      return (
        <SearchItem key={ idx }
          displayName={ user.username }
          pathname={ "/" + user.username } />
      );
    })
  },

  render: function () {
    return (
      <div className="search-results">

        { this.userResults() }

        { this.trackResults() }

      </div>
    );
  }
});

module.exports = SearchResults;
