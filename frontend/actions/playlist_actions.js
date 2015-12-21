var PlaylistAPIUtils = require("../utils/playlist_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var PlaylistingActions = {
  // Request actions

  fetchPlaylists: function (userId) {
    PlaylistAPIUtils.fetchPlaylists(
      userId,
      PlaylistActions.receivePlaylists
    );
  },

  fetchPlaylist: function (playlistId) {
    PlaylistAPIUtils.fetchPlaylist(
      playlistId,
      PlaylistActions.receivePlaylist
    );
  },

  createPlaylist: function (playlistData) {
    PlaylistAPIUtils.createPlaylist(
      playlistData,
      PlaylistActions.receivePlaylist
    );
  },

  updatePlaylist: function (playlistId, playlistData) {
    PlaylistAPIUtils.updatePlaylist(
      playlistId,
      playlistData,
      PlaylistActions.receivePlaylist
    );
  }

  deletePlaylist: function (playlistId) {
    PlaylistAPIUtils.deletePlaylist(
      playlistId,
      PlaylistActions.receivePlaylist
    );
  },

  // Response actions

  receivePlaylists: function (response) {
    AppDispatcher.dispatch({
      actionType: AppConstants.PLAYLISTS_RECEIVED,
      response: response
    });
  },

  receivePlaylist: function (response) {
    AppDispatcher.dispatch({
      actionType: AppConstants.PLAYLIST_RECEIVED,
      response: response
    });
  }
};

module.exports = PlaylistActions;
