var React = require("react");
var PlayerActions = require("../../actions/player_actions");

var Controller = React.createClass({
  render: function () {
    var playPauseClass = "fa ";

    if (this.props.isPlaying) {
      playPauseClass += "fa-pause";
    } else {
      playPauseClass += "fa-play";
    }

    console.log(playPauseClass);

    return (
      <div className="controller">
        <p>
          <span className="playing">Currently playing:&nbsp;</span>
          <span className="title">{ this.props.track.title }</span>
        </p>

        <p className="controller">
          <a onClick={ PlayerActions.playPreviousTrack }>
            <i className="fa fa-backward"></i>
          </a>

          <a onClick={ this.props.togglePlayPause }>
            <i className={ playPauseClass }></i>
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
