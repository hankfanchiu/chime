var TrackAPIUtils = require("../utils/track_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var TrackActions = {
  // Request actions

  fetchTracks: function (user) {
    TrackAPIUtils.fetchTracks(user, TrackActions.receiveTracks);
  },

  fetchTrack: function (title) {
    TrackAPIUtils.fetchTrack(title, TrackActions.receiveTrack);
  },

  createTrack: function (data) {
    TrackAPIUtils.createTrack(data, TrackActions.receiveTrack);
  },

  updateTrack: function (title, data) {
    TrackAPIUtils.updateTrack(title, data, TrackActions.receiveTrack);
  },

  deleteTrack: function (title) {
    TrackAPIUtils.deleteTrack(title, TrackActions.receiveTrack);
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
  }
};

module.exports = TrackActions;
