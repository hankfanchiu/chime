var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;
var TrackActions = require("../../actions/track_actions");

module.exports = React.createClass({
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
