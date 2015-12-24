var React = require("react");

var ForwardButton = React.createClass({
  _playNextTrack: function () {
    this.props.playNextTrack();
  },

  render: function () {
    return (
      <div className="controller-button">
        <a onClick={ this._playNextTrack }>
          <i className="controller-button fa fa-forward"></i>
        </a>
      </div>
    );
  }
});

module.exports = ForwardButton;
