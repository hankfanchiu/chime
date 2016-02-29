var React = require("react");
var ProgressBar = require("react-bootstrap").ProgressBar;

module.exports = React.createClass({
  _isComplete: function () {
    return this.props.progress === 100;
  },

  render: function () {
    var style = (this._isComplete() ? "success" : null);

    return (
      <div>
        { this._isComplete() ? "Audio uploaded!" : "Uploading audio..." }

        <ProgressBar active bsStyle={ style } now={ this.props.progress } />
      </div>
    );
  }
});
