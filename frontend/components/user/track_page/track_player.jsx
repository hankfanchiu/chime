var React = require("react");
var PlayerActions = require("../../../actions/player_actions");

var TrackPlayer = React.createClass({
  _playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  _addTrackToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    if (!track) {
      return <div className="row" />;
    }

    return (
      <div className="row">
        <div className="tracks tracks-index-item clear">
          <div className="image" onClick={ this._playTrack }>
            <img src={ track.img_thumb } />
          </div>

          <div className="detail">
            <p className="username">
              { track.user.username }
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

module.exports = TrackPlayer;
