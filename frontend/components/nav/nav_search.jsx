var React = require("react");

var NavSearch = React.createClass({
  _handleChange: function (e) {
    TODO
  },

  render: function () {
    return (
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text"
            className="form-control"
            placeholder="Search"
            onChange={ this._handleChange } />
        </div>
      </form>
    );
  }
});

module.exports = NavSearch;
