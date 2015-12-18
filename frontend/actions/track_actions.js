var TrackAPIUtils = require("../utils/track_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants;

var TrackActions = {
  fetchTracks: function () {
    TrackAPIUtils.fetchTracks(TrackActions.receiveTracks);
  },

  receiveTracks: function (tracks) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TRACKS_RECEIVED,
      tracks: tracks
    });
  }
};

module.exports = TrackActions;
