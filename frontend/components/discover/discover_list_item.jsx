var React = require("react");
var PlaybackActions = require("../../actions/playback_actions");

var DiscoverListItem = React.createClass({
  _playTrack: function (e) {
    PlaybackActions.playTrack(this.props.track);
  },

  render: function () {
    return (
      <div className="discover-list-item clear">
        <div className="image" onClick={ this._playTrack }>
          <img src={ this.props.track.img_url } />
        </div>

        <div className="detail">

          <p className="user">
            <a>{ this.props.track.user }</a>
          </p>

          <p className="title">
            { this.props.track.title }
          </p>

          <p>
            <a>(+) Add to playlist</a>
          </p>

        </div>
      </div>
    );
  }
});

module.exports = DiscoverListItem;
