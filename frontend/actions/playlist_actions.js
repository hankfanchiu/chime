var PlaylistAPIUtils = require("../utils/playlist_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var PlaylistActions = {
  // UI ACTIONS

  // Modal to add tracks to playlists, or to create a new playlist:
  showCreateModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_CREATE_PLAYLIST_MODAL
    });
  },

  closeCreateModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_CREATE_PLAYLIST_MODAL
    });
  },

  // Modal to confirm deleting a playlist:
  showDeleteModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_DELETE_PLAYLIST_MODAL
    });
  },

  closeDeleteModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_DELETE_PLAYLIST_MODAL
    });
  },

  // Modal to edit and update a playlist:
  showEditModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_EDIT_PLAYLIST_MODAL
    });
  },

  closeEditModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_EDIT_PLAYLIST_MODAL
    });
  },

  // REQUEST ACTIONS

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
    AppDispatcher.dispatch({
      actionType: ActionTypes.CREATE_PLAYLIST_INITIATED
    });

    PlaylistAPIUtils.createPlaylist(
      playlistData,
      PlaylistActions.receivePlaylistCreated
    );
  },

  updatePlaylist: function (playlistId, playlistData) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.UPDATE_PLAYLIST_INITIATED
    });

    PlaylistAPIUtils.updatePlaylist(
      playlistId,
      playlistData,
      PlaylistActions.receivePlaylistUpdated
    );
  },

  deletePlaylist: function (playlistId) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.DELETE_PLAYLIST_INITIATED
    });

    PlaylistAPIUtils.deletePlaylist(
      playlistId,
      PlaylistActions.receivePlaylistDeleted
    );
  },

  // RESPONSE ACTIONS

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

  receivePlaylistCreated: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLIST_CREATED,
      response: response
    });
  },

  receivePlaylistUpdated: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLIST_UPDATED,
      response: response
    });
  },

  receivePlaylistDeleted: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLIST_DELETED,
      response: response
    });
  }
};

module.exports = PlaylistActions;
