var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var PlayerActions = {
  playTrackNow: function (track) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAY_TRACK_NOW,
      track: track
    });
  },

  playNextTrack: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAY_NEXT_TRACK
    });
  },

  playPreviousTrack: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAY_PREVIOUS_TRACK
    });
  },

  autoPlay: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.AUTO_PLAY_TRACK
    });
  },

  addTrackToQueue: function (track) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.ADD_TRACK_TO_QUEUE,
      track: track
    });
  },

  loadPlaylist: function (playlist) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOAD_PLAYLIST,
      playlist: playlist
    });
  }
};

module.exports = PlayerActions;
