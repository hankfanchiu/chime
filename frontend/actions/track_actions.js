var TrackAPIUtils = require("../utils/track_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var TrackActions = {
  // Request actions

  fetchTracks: function (username) {
    TrackAPIUtils.fetchTracks(username, TrackActions.receiveTracks);
  },

  fetchTrack: function (username, trackSlug) {
    TrackAPIUtils.fetchTrack(username, trackSlug, TrackActions.receiveTrack);
  },

  createTrack: function (trackData) {
    TrackAPIUtils.createTrack(trackData, TrackActions.receiveNewTrack);
  },

  updateTrack: function (trackId, trackData) {
    TrackAPIUtils.updateTrack(trackId, trackData, TrackActions.receiveTrack);
  },

  deleteTrack: function (trackId) {
    TrackAPIUtils.deleteTrack(trackId, TrackActions.receiveTrack);
  },

  // Response actions

  receiveTracks: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TRACKS_RECEIVED,
      response: response
    });
  },

  receiveTrack: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TRACK_RECEIVED,
      response: response
    });
  },

  receiveNewTrack: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.NEW_TRACK_RECEIVED,
      response: response
    });
  }
};

module.exports = TrackActions;
