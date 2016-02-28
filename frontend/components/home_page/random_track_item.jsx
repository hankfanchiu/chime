var React = require("react");
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var RoundPlayButton = require("../utility/round_play_button");
var History = require("react-router").History;

var RandomTrackItem = React.createClass({
  mixins: [History],

  goToTrack: function () {
    var track = this.props.track;
    var pathname = "/" + track.user.username + "/" + track.slug;

    this.history.pushState(null, pathname);
  },

  goToUserProfile: function () {
    var pathname = "/" + this.props.track.user.username;

    this.history.pushState(null, pathname);
  },

  render: function () {
    var track = this.props.track;

    if (!track) { return <Col />; }

    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 }>
        <div className="random-track">
          <RoundPlayButton track={ track } />

          <Thumbnail src={ track.img_square } alt={ track.title }>
            <span className="username">
              <a className="username username-small"
                onClick={ this.goToUserProfile }>
                { track.user.username }
              </a>
            </span>

            <div className="title-container">
              <span className="title">
                <a className="title title-small" onClick={ this.goToTrack }>
                  { track.title }
                </a>
              </span>
            </div>
          </Thumbnail>
        </div>
      </Col>
    );
  }
});

module.exports = RandomTrackItem;
