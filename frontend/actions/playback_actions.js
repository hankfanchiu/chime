var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var PlaybackActions = {
  playTrack: function (track) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYBACK_TRACK_RECEIVED,
      track: track
    });
  }
};

module.exports = PlaybackActions;
