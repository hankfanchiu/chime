var React = require("react");
var History = require("react-router").History;

var SearchItem = React.createClass({
  mixins: [History],

  goToPage: function () {
    this.history.pushState(null, this.props.pathname);
  },

  render: function () {
    return (
      <div className="search-option">
        <a onClick={ this.goToPage }>{ this.props.displayName }</a>
      </div>
    );
  }
});

module.exports = SearchItem;
