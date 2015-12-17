var React = require("react");
var PlaybackActions = require("../../../actions/playback_actions");

var TracksIndexItem = React.createClass({
  _playTrack: function (e) {
    PlaybackActions.playTrack(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    return (
      <div className="tracks-index-item clear">
        <div className="image" onClick={ this._playTrack }>
          <img src={ track.img_url } />
        </div>

        <div className="detail">

          <p className="title">
            { track.title }
          </p>

          <p>
            <a>(+) Add to playlist</a>
          </p>

        </div>
      </div>
    );
  }
});

module.exports = TracksIndexItem;
