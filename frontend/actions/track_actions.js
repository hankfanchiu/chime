var TrackAPIUtils = require("../utils/track_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var TrackActions = {
  // Request actions

  fetchTracks: function (user) {
    TrackAPIUtils.fetchTracks(user, TrackActions.receiveTracks);
  },

  fetchTrack: function (slug) {
    TrackAPIUtils.fetchTrack(slug, TrackActions.receiveTrack);
  },

  createTrack: function (data) {
    TrackAPIUtils.createTrack(data, TrackActions.receiveTrack);
  },

  updateTrack: function (id, data) {
    TrackAPIUtils.updateTrack(id, data, TrackActions.receiveTrack);
  },

  deleteTrack: function (id) {
    TrackAPIUtils.deleteTrack(id, TrackActions.receiveTrack);
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
