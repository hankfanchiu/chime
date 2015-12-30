var TrackAPIUtils = require("../utils/track_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var TrackActions = {
  // UI actions

  showEditModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_EDIT_TRACK_MODAL
    });
  },

  closeEditModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_EDIT_TRACK_MODAL
    });
  },

  showDeleteModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_DELETE_TRACK_MODAL
    });
  },

  closeDeleteModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_DELETE_TRACK_MODAL
    });
  },

  // Request actions

  fetchTracks: function (username) {
    TrackAPIUtils.fetchTracks(
      username,
      TrackActions.receiveTracks
    );
  },

  fetchTrack: function (username, trackSlug) {
    TrackAPIUtils.fetchTrack(
      username,
      trackSlug,
      TrackActions.receiveTrack
    );
  },

  createTrack: function (trackData) {
    TrackAPIUtils.createTrack(
      trackData,
      TrackActions.receiveTrackCreated
    );
  },

  updateTrack: function (trackId, formData) {
    TrackAPIUtils.updateTrack(
      trackId,
      formData,
      TrackActions.receiveTrackUpdated
    );
  },

  deleteTrack: function (trackId) {
    TrackAPIUtils.deleteTrack(
      trackId,
      TrackActions.receiveTrackDeleted
    );
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

  receiveTrackCreated: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TRACK_CREATED,
      response: response
    });
  },

  receiveTrackUpdated: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TRACK_UPDATED,
      response: response
    });
  },

  receiveTrackDeleted: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TRACK_DELETED,
      response: response
    });
  }
};

module.exports = TrackActions;
