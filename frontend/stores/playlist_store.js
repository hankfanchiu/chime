var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _playlists = {};
var PlaylistStore = new Store(AppDispatcher);

PlaylistStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.PLAYLISTS_RECEIVED:
      resetPlaylists(response);
      break;

    case ActionTypes.PLAYLIST_RECEIVED:
      resetPlaylist(response);
      break;

  };
};

PlaylistStore.all = function () {
  var playlistsCopy = jQuery.extend({}, _playlists);

  return playlistsCopy;
};

PlaylistStore.find = function (identifier) {
  var playlist = _playlists[identifier];

  return playlist;
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

module.exports = PlaylistStore;
