var React = require("react");
var DiscoverIndex = require("./discover_index");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");

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
        <h1>Discover</h1>

        <DiscoverIndex tracks={ this.state.tracks } />
      </div>
    );
  }
});

module.exports = Discover;
