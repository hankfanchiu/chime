var React = require("react");
var PlayerStore = require("../../stores/player_store");
var History = require("react-router").History;

var Badge = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { track: PlayerStore.getTrack() };
  },

  componentDidMount: function () {
    this.listenerToken = PlayerStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  goToTrack: function () {
    var track = this.state.track;
    var pathname = "/" + track.user.username + "/" + track.slug;

    this.history.pushState(null, pathname);
  },

  goToUser: function () {
    var pathname = "/" + this.state.track.user.username;

    this.history.pushState(null, pathname);
  },

	render: function() {
    var track = this.state.track;

		return (
      <figure className="audio-badge">
        <div className="audio-badge-container">
          <div className="audio-badge-image" onClick={ this.goToTrack }>
            <img className="audio-badge-image" src={ track.img_hero } />
          </div>

          <section className="audio-badge-text">
            <span className="username">
              <a className="username username-small"
                onClick={ this.goToUser }>
                { track.user.username }
              </a>
            </span>

            <div className="title-container">
              <span className="title">
                <a className="title title-small"
                  onClick={ this.goToTrack }>
                  { track.title }
                </a>
              </span>
            </div>
          </section>
        </div>
      </figure>
		);
	}
});

module.exports = Badge;
