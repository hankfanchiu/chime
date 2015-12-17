var React = require("react");
var PlaybackActions = require("../../actions/playback_actions");

var SearchListItem = React.createClass({
  _playTrack: function (e) {
    PlaybackActions.playTrack(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    return (
      <div className="search-list-item clear">
        <div className="image" onClick={ this._playTrack }>
          <img src={ track.img_url } />
        </div>

        <div className="detail">

          <p className="user">
            <a>{ track.user.username }</a>
          </p>

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

module.exports = SearchListItem;
