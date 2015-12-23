var React = require("react");
var SearchItem = require("./search_item");

var SearchResults = React.createClass({
  renderUserResults: function () {
    var handleSearchClick = this.props.handleSearchClick;

    return this.props.users.map(function (user, idx) {
      return (
        <SearchItem key={ idx }
          displayName={ user.username }
          handleSearchClick={ handleSearchClick }
          pathname={ "/" + user.username } />
      );
    })
  },

  renderTrackResults: function () {
    var handleSearchClick = this.props.handleSearchClick;

    return this.props.tracks.map(function (track, idx) {
      return (
        <SearchItem key={ idx }
          displayName={ track.title }
          handleSearchClick={ handleSearchClick }
          pathname={ "/" + track.user + "/" + track.slug } />
      );
    })
  },

  render: function () {
    return (
      <div className="search-results" tabIndex="1"
        onBlur={ this.props.onBlur }>

        { this.renderTrackResults() }
        
        { this.renderUserResults() }
      </div>
    );
  }
});

module.exports = SearchResults;
