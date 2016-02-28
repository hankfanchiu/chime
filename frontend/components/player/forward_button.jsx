var React = require("react");
var PlayerActions = require("../../actions/player_actions");

var ForwardButton = React.createClass({
  playNextTrack: function () {
    PlayerActions.playNextTrack();
  },

  render: function () {
    return (
      <div className="controller-button">
        <a onClick={ this.playNextTrack }>

          <i className="controller-button fa fa-forward"></i>
        </a>
      </div>
    );
  }
});

module.exports = ForwardButton;
