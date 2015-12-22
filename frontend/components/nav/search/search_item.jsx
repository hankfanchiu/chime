var React = require("react");

var SearchItem = React.createClass({
  _handleClick: function () {
    this.props.handleSearchClick(this.props.pathname);
  },

  render: function () {
    return (
      <div className="search-option">
        <a onClick={ this._handleClick }>{ this.props.displayName }</a>
      </div>
    );
  }
});

module.exports = SearchItem;
