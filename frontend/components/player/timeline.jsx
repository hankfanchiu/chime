var React = require("react");
var AudioStore = require("../../stores/audio_store");
var TimeLabel = require("./time_label");
var ProgressBar = require("./progress_bar");

var Timeline = React.createClass({
  getInitialState: function () {
    return {
      currentTime: AudioStore.getCurrentTime(),
      duration: AudioStore.getDuration()
    };
  },

  componentDidMount: function () {
    this.listenerToken = AudioStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getInitialState());
  },

  render: function () {
    return (
      <figure className="audio-timeline">
        <TimeLabel name="time" time={ this.state.currentTime } />

        <ProgressBar currentTime={ this.state.currentTime }
          duration={ this.state.duration } />

        <TimeLabel name="duration" time={ this.state.duration } />
      </figure>
    );
  }
});

module.exports = Timeline;
