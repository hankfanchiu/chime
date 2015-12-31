var React = require("react");
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;

var Search = React.createClass({
  getInitialState: function () {
    return { query: "" };
  },

  _handleQueryChange: function () {
    this.setState({ query: this.refs.search.getValue() });
  },

  _handleSearch: function (e) {
    e.preventDefault();
  },

  searchButton: function () {
    return <Button>Search</Button>;
  },

  render: function () {
    return (
      <section className="hero-search-container">
        <section className="hero-search-form-container">
          <form onSubmit={ this._handleSearch }>
            <Input type="text"
              ref="search"
              placeholder="Search for artists and tracks"
              buttonAfter={ this.searchButton() }
              onChange={ this._handleQueryChange } />
          </form>
        </section>
      </section>
    );
  }
});

module.exports = Search;
