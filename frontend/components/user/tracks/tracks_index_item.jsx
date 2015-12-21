var React = require("react");
var PlayerActions = require("../../../actions/player_actions");

var TracksIndexItem = React.createClass({
  _playTrack: function (e) {
    PlayerActions.playTrackNow(this.props.track);
  },

  _addTrackToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    return (
      <div className="tracks tracks-index-item clear">
        <div className="image" onClick={ this._playTrack }>
          <img src={ track.img_url } />
        </div>

        <div className="detail">

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
    );
  }
});

module.exports = TracksIndexItem;
