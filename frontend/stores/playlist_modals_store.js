var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showCreateModal = false;
var _isSaving = false;
var _newPlaylistPathname = null;

var _showDeleteModal = false;
var _isDeleting = false;
var _playlistDeleted = false;

var _showEditModal = false;
var _isUpdating = false;
var _updatedPlaylistPathname = null;

var _errors = [];

var PlaylistModalsStore = new Store(AppDispatcher);

PlaylistModalsStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  _newPlaylistPathname = null;
  _playlistDeleted = false;
  _updatedPlaylistPathname = null;
  _errors = [];

  switch (actionType) {

    // Modals
    case ActionTypes.SHOW_CREATE_PLAYLIST_MODAL:
      setShowCreateModal(true);
      break;

    case ActionTypes.CLOSE_CREATE_PLAYLIST_MODAL:
      setShowCreateModal(false);
      break;

    case ActionTypes.SHOW_DELETE_PLAYLIST_MODAL:
      setShowDeleteModal(true);
      break;

    case ActionTypes.CLOSE_DELETE_PLAYLIST_MODAL:
      setShowDeleteModal(false);
      break;

    case ActionTypes.SHOW_EDIT_PLAYLIST_MODAL:
      setShowEditModal(true);
      break;

    case ActionTypes.CLOSE_EDIT_PLAYLIST_MODAL:
      setShowEditModal(false);
      break;

    // Responses
    case ActionTypes.CREATE_PLAYLIST_INITIATED:
      setIsSaving();
      break;

    case ActionTypes.PLAYLIST_CREATED:
      _isSaving = false;

      if (response.errors) {
        recordErrors(response.errors);
      } else {
        recordPlaylistCreated(response);
      }

      break;

    case ActionTypes.DELETE_PLAYLIST_INITIATED:
      setIsDeleting();
      break;

    case ActionTypes.PLAYLIST_DELETED:
      _isDeleting = false;

      if (response.errors) {
        recordErrors(response.errors);
      } else {
        recordPlaylistDeleted();
      }

      break;

    case ActionTypes.UPDATE_PLAYLIST_INITIATED:
      setIsUpdating();
      break;

    case ActionTypes.PLAYLIST_UPDATED:
      _isUpdating = false;

      if (response.errors) {
        recordErrors(response.errors);
      } else {
        recordPlaylistUpdated(response);
      }

      break;
  };
};

PlaylistModalsStore.getErrors = function () {
  return _errors.slice();
};

PlaylistModalsStore.showCreateModal = function () {
  return _showCreateModal;
};

PlaylistModalsStore.showDeleteModal = function () {
  return _showDeleteModal;
};

PlaylistModalsStore.showEditModal = function () {
  return _showEditModal;
};

PlaylistModalsStore.isSaving = function () {
  return _isSaving;
};

PlaylistModalsStore.isDeleting = function () {
  return _isDeleting;
};

PlaylistModalsStore.isUpdating = function () {
  return _isUpdating;
};

PlaylistModalsStore.getNewPlaylistPathname = function () {
  return _newPlaylistPathname;
};

PlaylistModalsStore.getPlaylistDeleted = function () {
  return _playlistDeleted;
};

PlaylistModalsStore.getUpdatedPlaylistPathname = function () {
  return _updatedPlaylistPathname;
};

var setShowCreateModal = function (boolean) {
  _showCreateModal = boolean;

  PlaylistModalsStore.__emitChange();
};

var setShowDeleteModal = function (boolean) {
  _showDeleteModal = boolean;

  PlaylistModalsStore.__emitChange();
};

var setShowEditModal = function (boolean) {
  _showEditModal = boolean;

  PlaylistModalsStore.__emitChange();
};

var setIsSaving = function () {
  _isSaving = true;

  PlaylistModalsStore.__emitChange();
};

var setIsDeleting = function () {
  _isDeleting = true;

  PlaylistModalsStore.__emitChange();
};

var setIsUpdating = function () {
  _isUpdating = true;

  PlaylistModalsStore.__emitChange();
};

var recordPlaylistCreated = function (response) {
  var playlist = response.playlist;
  var username = playlist.user.username;
  var pathname = "/" + username + "/playlists/" + playlist.slug;

  _newPlaylistPathname = pathname;
  _showCreateModal = false;

  PlaylistModalsStore.__emitChange();
};

var recordPlaylistDeleted = function () {
  _playlistDeleted = true;
  _showDeleteModal = false;

  PlaylistModalsStore.__emitChange();
};

var recordPlaylistUpdated = function (response) {
  var updatedPlaylist = response.playlist;
  var newSlug = updatedPlaylist.slug;
  var username = updatedPlaylist.user.username;

  _updatedPlaylistPathname = "/" + username + "/playlists/" + newSlug;
  _showEditModal = false;

  PlaylistModalsStore.__emitChange();
};

var recordErrors = function (errors) {
  _errors = response.errors;

  PlaylistModalsStore.__emitChange();
};

module.exports = PlaylistModalsStore;
