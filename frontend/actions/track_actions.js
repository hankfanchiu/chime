var AppDispatcher = require("../dispatcher/dispatcher");
var WebAPIUtils = require("../utils/web_api_utils");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var TrackActions = {
  fetchTracks: function () {
    WebAPIUtils.fetchTracks(TrackActions.receiveTracks);
  },

  receiveTracks: function (tracks) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TRACKS_RECEIVED,
      tracks: tracks
    });
  }
};

module.exports = TrackActions;
