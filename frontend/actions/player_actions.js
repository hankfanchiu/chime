var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var PlayerActions = {

  // Direct actions for the HTML audio element:
  playAudio: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAY_AUDIO
    });
  },

  pauseAudio: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PAUSE_AUDIO
    });
  },

  seekTo: function (time) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SEEK_TO,
      response: time
    });
  },

  adjustVolumeTo: function (volume) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.ADJUST_VOLUME_TO,
      response: volume
    });
  },

  // Clearing user actions from Player Store:
  resetRequests: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.RESET_PLAYER_REQUESTS
    });
  },

  // Actions regarding tracks, queue, and playlist:
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

  autoPlayNextTrack: function () {
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
