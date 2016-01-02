var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var AudioActions = {
  setToIsPlaying: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_SET_TO_PLAYING
    });
  },

  setToIsPaused: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_SET_TO_PAUSED
    });
  },

  setToIsEnded: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_SET_TO_ENDED
    });
  },

  setCurrentTime: function (time) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_CURRENT_TIME_RECEIVED,
      response: time
    });
  },

  setVolume: function (volume) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_VOLUME_RECEIVED,
      response: volume
    });
  },

  setDuration: function (duration) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUDIO_DURATION_RECEIVED,
      response: duration
    });
  }
};

module.exports = AudioActions;
