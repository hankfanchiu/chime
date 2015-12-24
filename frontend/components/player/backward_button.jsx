var React = require("react");

var BackwardButton = React.createClass({
  _playPreviousTrack: function () {
    this.props.playPreviousTrack();
  },

  render: function () {
    return (
      <div className="controller-button">
        <a onClick={ this._playPreviousTrack }>
          <i className="controller-button fa fa-backward"></i>
        </a>
      </div>
    );
  }
});

module.exports = BackwardButton;
