var React = require("react");
var Link = require("react-router").Link;
var PlayerStore = require("../../stores/player_store");

module.exports = React.createClass({
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

	render: function() {
    var track = this.state.track;
    var username = track.user.username;

		return (
      <figure className="audio-badge">
        <div className="audio-badge-container">
          <div className="audio-badge-image" onClick={ this.goToTrack }>
            <img className="audio-badge-image" src={ track.img_hero } />
          </div>

          <section className="audio-badge-text">
            <span className="username">
              <Link className="username username-small" to={ "/" + username }>
                { username }
              </Link>
            </span>

            <div className="title-container">
              <span className="title">
                <Link className="title title-small"
                  to={ "/" + username + "/" + track.slug }>
                  { track.title }
                </Link>
              </span>
            </div>
          </section>
        </div>
      </figure>
		);
	}
});
