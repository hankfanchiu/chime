var React = require("react");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");
var CollectIndex = require("./collect_index");

var Collect = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { tracks: TrackStore.all() };
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
    TrackActions.fetchTracks(null);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <div className="container collect">
        <h1>Your Collections</h1>

        <CollectIndex tracks={ this.state.tracks } />
      </div>
    );
  }
});

module.exports = Collect;
