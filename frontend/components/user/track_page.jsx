var React = require("react");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");

var TrackPage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { track: TrackStore.find(this.props.params.track) };
  },

  componentWillMount: function () {
    TrackActions.fetchTrack(this.props.params.track);
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.params.track !== nextProps.params.track) {
      TrackActions.fetchTrack(nextProps.params.track);
    }
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <div className="row">
        Track Title: { this.state.track.title }
      </div>
    );
  }
});

module.exports = TrackPage;
