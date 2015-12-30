var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;
var TrackActions = require("../../actions/track_actions");

var DeleteButton = React.createClass({
  showDeleteModal: function () {
    TrackActions.showDeleteModal();
  },

  render: function () {
    return (
      <span className="btn btn-default delete"
        onClick={ this.showDeleteModal }>
        <Glyphicon glyph="trash" className="delete-icon"/>
      </span>
    );
  }
});

module.exports = DeleteButton;
