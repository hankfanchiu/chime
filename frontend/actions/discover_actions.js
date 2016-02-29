var TrackAPIUtils = require("../utils/track_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var DiscoverActions = {

  // Request actions
  fetchTracks: function () {
    TrackAPIUtils.fetchTracks(null, DiscoverActions.receiveTracks);
  },

  // Response actions
  receiveTracks: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.DISCOVER_TRACKS_RECEIVED,
      response: response
    });
  }
};

module.exports = DiscoverActions;
