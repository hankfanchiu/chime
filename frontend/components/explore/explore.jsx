var React = require("react");
var ExploreIndex = require("./explore_index");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");

var Explore = React.createClass({
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
      <div className="container">
        <div className="col-xs-10 col-xs-offset-1 explore">
          <h1>Explore</h1>

          <ExploreIndex tracks={ this.state.tracks } />
        </div>
      </div>
    );
  }
});

module.exports = Explore;
