var React = require("react");
var PlayerActions = require("../../actions/player_actions");
var PlayerStore = require("../../stores/player_store");

var Controller = React.createClass({
  _togglePlayPause: function () {
    this.props.setPlayRequest(!this.props.isPlaying);
  },

  playPauseClass: function () {
    return (this.props.isPlaying ? "fa fa-pause" : "fa fa-play");
  },

  render: function () {
    if (PlayerStore.queueIsEmpty()) { return <div />; }

    return (
      <div className="controller">
        <p>
          <span className="title">{ this.props.track.title }</span>
        </p>

        <div className="controller-buttons">
          <div className="controller-button">
            <a onClick={ PlayerActions.playPreviousTrack }>
              <i className="fa fa-backward"></i>
            </a>
          </div>

          <div className="controller-button">
            <a onClick={ this._togglePlayPause }>
              <i className={ this.playPauseClass() }></i>
            </a>
          </div>

          <div className="controller-button">
            <a onClick={ PlayerActions.playNextTrack }>
              <i className="fa fa-forward"></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Controller;
