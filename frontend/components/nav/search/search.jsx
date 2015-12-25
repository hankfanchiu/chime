var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Navbar = ReactBootstrap.Navbar;
var Input = ReactBootstrap.Input;

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

  _handleSearchChange: function () {
    var query = this.refs.input.getValue();

    if (query === "") { return; }

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
      <Navbar.Form pullLeft>
        <Input type="text"
          ref="input"
          label="Search"
          labelClassName="sr-only"
          placeholder="Search for Tracks and Users"
          onChange={ this._handleSearchChange } />

        { this.renderSearchResults() }
      </Navbar.Form>
    );
  }
});

module.exports = Search;
