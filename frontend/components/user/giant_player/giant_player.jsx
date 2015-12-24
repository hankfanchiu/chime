var React = require("react");
var PlayerActions = require("../../../actions/player_actions");

var GiantPlayer = React.createClass({
  _playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  _addTrackToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  renderUsername: function () {
    var user = this.props.track.user;

    if (user) {
      return user.username;
    }
  },

  render: function () {
    var track = this.props.track;

    return (
      <div className="row">
        <div className="tracks tracks-index-item clear">
          <div className="image" onClick={ this._playTrack }>
            <img src={ track.img_thumb } />
          </div>

          <div className="detail">
            <p className="username">
              { this.renderUsername() }
            </p>

            <p className="title">
              { track.title }
            </p>

            <p>
              <a onClick={ this._addTrackToQueue }>
                <i className="fa fa-plus"></i> Add to queue
              </a>
            </p>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = GiantPlayer;
