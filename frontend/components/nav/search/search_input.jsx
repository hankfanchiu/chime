var React = require("react");
var SearchActions = require("../../../actions/search_actions");

var SearchInput = React.createClass({
  render: function () {
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <label className="sr-only">Search</label>

          <input type="text"
            className="form-control"
            placeholder="Search for Tracks and Users"
            onChange={ this.props.handleSearchChange }
            value={ this.props.query } />
        </div>
      </form>
    );
  }
});

module.exports = SearchInput;
