var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var showModal = false;
var _playlists = {};
var _newPlaylistPathname = null;
var PlaylistStore = new Store(AppDispatcher);

PlaylistStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.SHOW_PLAYLIST_MODAL:
      setShowModal(true);
      break;

    case ActionTypes.CLOSE_PLAYLIST_MODAL:
      setShowModal(false);
      break;

    case ActionTypes.PLAYLISTS_RECEIVED:
      resetPlaylists(response);
      break;

    case ActionTypes.PLAYLIST_RECEIVED:
      resetPlaylist(response);
      break;

    case ActionTypes.NEW_PLAYLIST_RECEIVED:
      if (!response.errors) { setPlaylistPathname(response); }
      break;

  };
};

PlaylistStore.showModal = function () {
  return _showModal;
};

PlaylistStore.all = function () {
  var playlistsCopy = jQuery.extend({}, _playlists);

  return playlistsCopy;
};

PlaylistStore.find = function (identifier) {
  var playlist = _playlists[identifier];

  return playlist;
};

PlaylistStore.getPlaylistPathname = function () {
  return _newPlaylistPathname;
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  PlaylistStore.__emitChange();
};

var resetPlaylists = function (playlists) {
  var identifier;

  _playlists = {};

  playlists.forEach(function (playlist) {
    identifier = playlist.user.username + "-" + playlist.slug;
    _playlists[identifier] = playlist;
  });

  PlaylistStore.__emitChange();
};

var resetPlaylist = function (playlist) {
  var identifier = playlist.user.username + "-" + playlist.slug;
  _playlists[identifier] = playlist;

  PlaylistStore.__emitChange();
};

var setPlaylistPathname = function (playlist) {
  _showModal = false;
  _newTrackPathname = "/" + playlist.user.username + "/" + playlist.slug;

  PlaylistStore.__emitChange();
};

module.exports = PlaylistStore;
