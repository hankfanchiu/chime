var PlaylistAPIUtils = require("../utils/playlist_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var PlaylistActions = {
  // UI actions

  showPlaylistModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_PLAYLIST_MODAL
    });
  },

  closePlaylistModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_PLAYLIST_MODAL
    });
  },

  // Request actions

  fetchPlaylists: function (username) {
    PlaylistAPIUtils.fetchPlaylists(
      username,
      PlaylistActions.receivePlaylists
    );
  },

  fetchPlaylist: function (username, playlistSlug) {
    PlaylistAPIUtils.fetchPlaylist(
      username,
      playlistSlug,
      PlaylistActions.receivePlaylist
    );
  },

  createPlaylist: function (playlistData) {
    PlaylistAPIUtils.createPlaylist(
      playlistData,
      PlaylistActions.receiveCreatedPlaylist
    );
  },

  updatePlaylist: function (playlistId, playlistData) {
    PlaylistAPIUtils.updatePlaylist(
      playlistId,
      playlistData,
      PlaylistActions.receivePlaylist
    );
  },

  deletePlaylist: function (playlistId) {
    PlaylistAPIUtils.deletePlaylist(
      playlistId,
      PlaylistActions.receivePlaylist
    );
  },

  // Response actions

  receivePlaylists: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLISTS_RECEIVED,
      response: response
    });
  },

  receivePlaylist: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLIST_RECEIVED,
      response: response
    });
  },

  receiveCreatedPlaylist: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLIST_CREATED,
      response: response
    });
  }
};

module.exports = PlaylistActions;
