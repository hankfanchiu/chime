var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;
var TrackActions = require("../../actions/track_actions");

var EditButton = React.createClass({
  showEditModal: function () {
    TrackActions.showEditModal();
  },

  render: function () {
    return (
      <span className="btn btn-default edit-track"
        onClick={ this.showEditModal }>
        <Glyphicon glyph="edit" className="edit-icon"/>
      </span>
    );
  }
});

module.exports = EditButton;
