var React = require("react");
var PlaybackActions = require("../../actions/playback_actions");

var Discover = React.createClass({
  _addClass: function (e) {
    var $box = $(e.currentTarget);
    $box.addClass("mousedown");
  },

  _removeClass: function (e) {
    var $box = $(e.currentTarget);
    $box.removeClass("mousedown");
  },

  _playTrack: function (e) {
    PlaybackActions.playTrack(this.props.track);
  },

  render: function () {
    return (
      <div className="discover-index-item">
        <div className="box"
          onMouseDown={ this._addClass }
          onMouseUp={ this._removeClass }
          onMouseOut={ this._removeClass }
          onClick={ this._playTrack }>

          <div className="image">
            <img src={ this.props.track.img_url } />
          </div>

          <p className="title">{ this.props.track.title }</p>

          <p className="user">{ this.props.track.user }</p>
        </div>
      </div>
    );
  }
});

module.exports = Discover;
