var React = require("react");
var History = require("react-router").History;

var Badge = React.createClass({
  mixins: [History],

  _goToTrack: function () {
    var username = this.props.track.user.username;
    var slug = this.props.track.slug;
    var pathname = "/" + username + "/" + slug;

    this.history.pushState(null, pathname);
  },

  _goToUser: function () {
    var pathname = "/" + this.props.track.user.username;

    this.history.pushState(null, pathname);
  },

	render: function() {
    var track = this.props.track;

		return (
      <div className="audio-badge-container">

        <div className="audio-badge-image" onClick={ this._goToTrack }>
          <img className="audio-badge-image" src={ track.img_hero } />
        </div>

        <div className="audio-badge-text">
          <span className="username">
            <a onClick={ this._goToUser }>
              { track.user.username }
            </a>
          </span>

          <span className="title">
            <a onClick={ this._goToTrack }>
              { track.title }
            </a>
          </span>
        </div>

      </div>
		);
	}
});

module.exports = Badge;
