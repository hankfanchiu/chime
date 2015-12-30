var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;

var DeleteButton = React.createClass({
  render: function () {
    return (
      <span className="btn btn-default delete"
        onClick={ this.props.delete }>
        <Glyphicon glyph="trash" className="delete-icon"/> Delete
      </span>
    );
  }
});

module.exports = DeleteButton;
