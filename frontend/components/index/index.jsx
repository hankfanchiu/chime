var React = require("react");
var IndexList = require("./index_list");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");

var Index = React.createClass({
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
      <div className="container index">
        <h1>See what's trending</h1>

        <IndexList tracks={ this.state.tracks } />
      </div>
    );
  }
});

module.exports = Index;
