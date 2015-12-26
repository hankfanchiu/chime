var React = require("react");
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Image = require("react-bootstrap").Image;
var PlayerActions = require("../../../actions/player_actions");
var History = require("react-router").History;

var TracksIndexItem = React.createClass({
  mixins: [History],

  _playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  _addTrackToQueue: function () {
    PlayerActions.addTrackToQueue(this.props.track);
  },

  _pushState: function (pathname) {
    this.history.pushState(null, pathname);
  },

  _goToUser: function () {
    var pathname = "/" + this.props.username;

    this._pushState(pathname);
  },

  _goToTrack: function () {
    var pathname = "/" + this.props.username + "/" + this.props.track.slug;

    this._pushState(pathname);
  },

  render: function () {
    var track = this.props.track;

    return (
      <ListGroupItem>
        <Image src={ track.img_thumb } onClick={ this._playTrack } />

        <div className="detail">
          <p className="username">
            <a onClick={ this._goToUser }>{ track.user.username }</a>
          </p>

          <p className="title">
            <a onClick={ this._goToTrack }>{ track.title }</a>
          </p>

          <p>
            <a onClick={ this._addTrackToQueue }>
              <i className="fa fa-plus"></i> Add to queue
            </a>
          </p>

        </div>
      </ListGroupItem>
    );
  }
});

module.exports = TracksIndexItem;
