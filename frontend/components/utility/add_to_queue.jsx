var React = require("react");
var Glyphicon = require("react-bootstrap").Glyphicon;

var AddToQueue = React.createClass({
  addToQueue: function () {
    this.props.addToQueue();
  },

  render: function () {
    return (
      <span className="btn btn-default add-to-queue"
        onClick={ this.addToQueue }>
        <Glyphicon glyph="plus" className="plus-icon"/> Add to queue
      </span>
    );
  }
});

module.exports = AddToQueue;
