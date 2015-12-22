var React = require("react");
var TrackStore = require("../../stores/track_store");
var TrackActions = require("../../actions/track_actions");

var TrackPage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    var params = this.props.params;
    var trackIdentifier = params.user + "-" + params.track;

    return { track: TrackStore.find(trackIdentifier) };
  },

  componentWillMount: function () {
    var user = this.props.params.user;
    var track = this.props.params.track;

    TrackActions.fetchTrack(user, track);
  },

  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
  },

  componentWillReceiveProps: function (nextProps) {
    var nextUser = nextProps.params.user;
    var nextTrack = nextProps.params.track;

    if (this.props.params.track !== nextTrack) {
      TrackActions.fetchTrack(nextUser, nextTrack);
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
