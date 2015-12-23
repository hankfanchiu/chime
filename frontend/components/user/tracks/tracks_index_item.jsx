var React = require("react");
var PlayerActions = require("../../../actions/player_actions");
var History = require("react-router").History;

var TracksIndexItem = React.createClass({
  mixins: [History],

  _playTrack: function (e) {
    PlayerActions.playTrackNow(this.props.track);
  },

  _addTrackToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  _goToTrack: function () {
    var url = "/" + this.props.user + "/" + this.props.track.slug;

    this.history.pushState(null, url);
  },

  render: function () {
    return (
      <div className="tracks tracks-index-item clear">
        <div className="image" onClick={ this._playTrack }>
          <img src={ this.props.track.img_thumb } />
        </div>

        <div className="detail">

          <p className="title">
            <a onClick={ this._goToTrack }>{ this.props.track.title }</a>
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
