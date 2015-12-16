var React = require("react");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");
var DiscoverList = require("./discover_list");

var Discover = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { tracks: TrackStore.all() };
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
    TrackActions.fetchTracks();
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <div className="container discover">
        <h1>Discover new chimes</h1>

        <DiscoverList tracks={ this.state.tracks } />
      </div>
    );
  }
});

module.exports = Discover;
