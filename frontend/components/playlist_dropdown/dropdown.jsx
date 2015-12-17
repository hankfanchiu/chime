var React = require("react");
var ProfileStore = require("../../stores/profile_store");
var ProfileActions = require("../../actions/profile_actions");

var Dropdown = React.createClass({
  getInitialState: function () {
    return { playlists: ProfileStore.getPlaylists() }
  },

  renderPlaylists: function () {
    return this.state.playlists.map(function (playlist, idx) {
      return <li key={ idx }>{ playlist.title }</li>;
    });
  },

  render: function () {
    return (
      <div className="playlist-dropdown">
        <p>Dropdown</p>

        <ul>
          { this.renderPlaylists() }
        </ul>
      </div>
    );
  }
});

module.exports = Dropdown;
