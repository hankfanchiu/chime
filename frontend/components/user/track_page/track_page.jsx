var React = require("react");
var TrackStore = require("../../../stores/track_store");
var TrackActions = require("../../../actions/track_actions");

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

    var sameUser = (this.props.params.user === nextUser);
    var sameTrack = (this.props.params.track === nextTrack);

    if (sameUser && sameTrack) { return; }

    TrackActions.fetchTrack(nextUser, nextTrack);
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
        <div className="row">
          <h1>{ this.state.track.title }</h1>
        </div>
      </div>
    );
  }
});

module.exports = TrackPage;
