var React = require("react");
var PlayerActions = require("../../actions/player_actions");

var DiscoverListItem = React.createClass({
  _addClass: function (e) {
    var $box = $(e.currentTarget);
    $box.addClass("mousedown");
  },

  _removeClass: function (e) {
    var $box = $(e.currentTarget);
    $box.removeClass("mousedown");
  },

  _playTrack: function (e) {
    PlayerActions.playTrack(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    return (
      <div className="discover-list-item">
        <div className="box"
          onMouseDown={ this._addClass }
          onMouseUp={ this._removeClass }
          onMouseOut={ this._removeClass }
          onClick={ this._playTrack }>

          <div className="image">
            <img src={ track.img_url } />
          </div>

          <p className="title">{ track.title }</p>

          <p className="user">{ track.user.username }</p>
        </div>
      </div>
    );
  }
});

module.exports = DiscoverListItem;
