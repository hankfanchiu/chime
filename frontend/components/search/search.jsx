var React = require("react");
var Input = require("react-bootstrap").Input;
var Glyphicon = require("react-bootstrap").Glyphicon;
var SearchStore = require("../../stores/search_store");
var SearchActions = require("../../actions/search_actions");
var SearchResults = require("../search/search_results");

var HomeSearch = React.createClass({
  getInitialState: function () {
    return {
      query: "",
      showResults: false,
      tracks: SearchStore.getTopTrackResults(5),
      users: SearchStore.getTopUserResults(5)
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
      tracks: SearchStore.getTopTrackResults(5),
      users: SearchStore.getTopUserResults(5)
    });
  },

  _clearQuery: function () {
    this.setState({ query: "" });
  },

  clearResults: function () {
    SearchActions.clearResults();
    this.setState({ showResults: false });
  },

  handleQueryChange: function () {
    var query = this.refs.input.getValue();

    this.setState({ query: query });

    if (query === "") {
      this.clearResults();
    } else {
      this._queryForResults(query);
    }
  },

  handleSubmit: function (e) {
    e.preventDefault();

    // TODO go to search results page
  },

  _queryForResults: function (query) {
    if (this.promise) {
      clearInterval(this.promise);
    }

    this.promise = setTimeout(function () {
      SearchActions.fetchResults(query.toLowerCase());
    }, 200);

    this.setState({ showResults: true });
  },

  searchIcon: function () {
    return <Glyphicon glyph="search" />;
  },

  searchResults: function () {
    return (
      <SearchResults name={ this.props.searchResultsName }
        clearQuery={ this._clearQuery }
        tracks={ this.state.tracks }
        users={ this.state.users } />
    );
  },

  render: function () {
    return (
      <form onSubmit={ this.handleSubmit }
        onBlur={ this.clearResults }>

        <Input type="text"
          ref="input"
          id={ this.props.id }
          value={ this.state.query }
          label="Search"
          labelClassName="sr-only"
          groupClassName={ this.props.groupClassName }
          addonAfter={ this.searchIcon() }
          placeholder="Search for artists and tracks"
          onChange={ this.handleQueryChange } />

        { this.state.showResults ? this.searchResults() : "" }
      </form>
    );
  }
});

module.exports = HomeSearch;
