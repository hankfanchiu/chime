var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;

var EditButton = React.createClass({
  render: function () {
    return (
      <span className="btn btn-default edit-track"
        onClick={ this.props.edit }>
        <Glyphicon glyph="edit" className="edit-icon"/> Edit
      </span>
    );
  }
});

module.exports = EditButton;
