var React = require("react");
var Navbar = require("react-bootstrap").Navbar;
var Input = require("react-bootstrap").Input;
var Glyphicon = require("react-bootstrap").Glyphicon;
var SearchActions = require("../../../actions/search_actions");
var SearchStore = require("../../../stores/search_store");
var SearchResults = require("./search_results");

var Search = React.createClass({
  getInitialState: function () {
    return {
      query: "",
      showResults: false,
      tracks: SearchStore.getTrackResults(),
      users: SearchStore.getUserResults()
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
      tracks: SearchStore.getTrackResults(),
      users: SearchStore.getUserResults()
    });
  },

  _clearQuery: function () {
    this.setState({ query: "" });
  },

  _clearResults: function () {
    SearchActions.clearResults();
    this.setState({ showResults: false });
  },

  _handleQueryChange: function () {
    var query = this.refs.input.getValue();

    this.setState({ query: query });

    if (query === "") {
      this._clearResults();
    } else {
      this._queryForResults(query);
    }
  },

  _handleSubmit: function (e) {
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

  searchResults: function () {
    return (
      <SearchResults clearQuery={ this._clearQuery }
        tracks={ this.state.tracks }
        users={ this.state.users } />
    );
  },

  render: function () {
    var searchIcon = <Glyphicon glyph="search" />;

    return (
      <Navbar.Form pullLeft>
        <form onSubmit={ this._handleSubmit } onBlur={ this._clearResults }>
          <Input type="text"
            ref="input"
            id="search-input"
            value={ this.state.query }
            label="Search"
            labelClassName="sr-only"
            addonAfter={ searchIcon }
            placeholder="Search for artists and tracks"
            onChange={ this._handleQueryChange } />

          { this.state.showResults ? this.searchResults() : "" }
        </form>
      </Navbar.Form>
    );
  }
});

module.exports = Search;
