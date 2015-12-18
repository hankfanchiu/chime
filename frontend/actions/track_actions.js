var TrackAPIUtils = require("../utils/track_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var TrackActions = {
  // Request actions

  fetchTracks: function () {
    TrackAPIUtils.fetchTracks(TrackActions.receiveTracks);
  },

  // Response actions

  receiveTracks: function (tracks) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TRACKS_RECEIVED,
      tracks: tracks
    });
  }
};

module.exports = TrackActions;
