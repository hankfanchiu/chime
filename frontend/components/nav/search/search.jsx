var React = require("react");
var SearchActions = require("../../../actions/search_actions");
var SearchStore = require("../../../stores/search_store");
var SearchInput = require("./search_input");
var SearchResults = require("./search_results");

var Search = React.createClass({
  getInitialState: function () {
    return {
      query: "",
      users: SearchStore.getUserResults(),
      tracks: SearchStore.getTrackResults(),
      showResults: false
    };
  },

  componentDidMount: function () {
    this.listenerToken = SearchStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({
      users: SearchStore.getUserResults(),
      tracks: SearchStore.getTrackResults()
    });
  },

  _handleSearchChange: function (e) {
    var query = e.target.value;

    if (this.promise) { clearInterval(this.promise); }

    this.setState({ query: query, showResults: true });
    this.promise = setTimeout(function () {
      SearchActions.fetchResults(query.toLowerCase());
    }.bind(this), 400);
  },

  _handleSearchClick: function (pathname) {
    this.props.pushState(pathname);
    this.setState({ query: "", users: [], tracks: [], showResults: false });
  },

  _onBlur: function () {
    debugger;
    this.setState({ showResults: false });
  },

  renderSearchResults: function () {
    if (this.state.showResults) {
      return (
        <SearchResults
          users={ this.state.users }
          tracks={ this.state.tracks }
          handleSearchClick={ this._handleSearchClick }
          onBlur={ this._onBlur } />
      );
    }
  },

  render: function () {
    return (
      <div className="search">
        <SearchInput query={ this.state.query }
          handleSearchChange={ this._handleSearchChange } />

        { this.renderSearchResults() }
      </div>
    );
  }
});

module.exports = Search;
