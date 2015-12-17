var React = require("react");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");
var SearchList = require("./search_list");

var Search = React.createClass({
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
      <div className="container search">
        <h1>Search chimes</h1>

        <SearchList tracks={ this.state.tracks } />
      </div>
    );
  }
});

module.exports = Search;
