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
          <span className="playing">Currently playing: </span>
          <span className="title">{ this.props.track.title }</span>
        </p>

        <p className="controller">
          <a onClick={ PlayerActions.playPreviousTrack }>
            <i className="fa fa-backward"></i>
          </a>

          <a onClick={ this._togglePlayPause }>
            <i className={ this.playPauseClass() }></i>
          </a>

          <a onClick={ PlayerActions.playNextTrack }>
            <i className="fa fa-forward"></i>
          </a>
        </p>
      </div>
    );
  }
});

module.exports = Controller;
