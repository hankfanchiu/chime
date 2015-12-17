var React = require("react");
var PlaybackActions = require("../../actions/playback_actions");
var PlaylistDropdown = require("../playlist_dropdown/dropdown");

var SearchIndexItem = React.createClass({
  getInitialState: function () {
    return { isDropdownVisible: false };
  },

  _playTrack: function () {
    PlaybackActions.playTrack(this.props.track);
  },

  _showDropdown: function () {
    this.setState({ isDropdownVisible: true })
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
      <div className="search-index-item clear">
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
            <a onClick={ this._showDropdown }>(+) Add to playlist</a>
          </p>

          { this.renderDropdown() }

        </div>
      </div>
    );
  }
});

module.exports = SearchIndexItem;
