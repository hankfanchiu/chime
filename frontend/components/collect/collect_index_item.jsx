var React = require("react");
var PlayerActions = require("../../actions/player_actions");
var PlaylistDropdown = require("../playlist_dropdown/dropdown");
var History = require("react-router").History;

var CollectIndexItem = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { isDropdownVisible: false };
  },

  _playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  _showDropdown: function () {
    this.setState({ isDropdownVisible: true })
  },

  _goToUser: function () {
    var pathname = "/" + this.props.track.user.username;

    this.history.pushState(null, pathname);
  },

  renderDropdown: function () {
    if (this.state.isDropdownVisible) {
      return <PlaylistDropdown trackId={ this.props.track.id }/>;
    } else {
      return <div></div>
    }
  },

  render: function () {
    var track = this.props.track;

    return (
      <div className="tracks tracks-index-item clear">
        <div className="image" onClick={ this._playTrack }>
          <img src={ track.img_thumb } />
        </div>

        <div className="detail">

          <p className="user">
            <a onClick={ this._goToUser }>{ track.user.username }</a>
          </p>

          <p className="title">
            { track.title }
          </p>

          <p>
            <a onClick={ this._showDropdown }>(+) Add to playlist</a>
          </p>

          { this.renderDropdown() }

        </div>
      </div>
    );
  }
});

module.exports = CollectIndexItem;
