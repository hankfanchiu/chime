var React = require("react");
var TracksIndex = require("../tracks/tracks_index");

var PlaylistsIndexItem = React.createClass({
  getInitialState: function () {
    return { isExpanded: false };
  },

  _toggle: function (e) {
    this.setState({ isExpanded: !this.state.isExpanded });
  },

  renderTracksIndex: function () {
    if (this.state.isExpanded) {
      return <TracksIndex tracks={ this.props.playlist.tracks } />;
    } else {
      return <div></div>;
    }
  },

  render: function () {
    var playlist = this.props.playlist;
    var option = (this.state.isExpanded ? "Hide Tracks" : "Show Tracks");

    return (
      <div className="playlists-index-item clear">
        <p>
          { playlist.title }: { playlist.description } | <a onClick={ this._toggle }>{ option }</a>
        </p>

        { this.renderTracksIndex() }
      </div>
    );
  }
});

module.exports = PlaylistsIndexItem;
