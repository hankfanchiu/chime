var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _showModal = false;
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
      if (!response.errors) { resetPlaylists(response); }
      break;

    case ActionTypes.PLAYLIST_RECEIVED:
      if (!response.errors) { resetPlaylist(response); }
      break;

    case ActionTypes.PLAYLIST_CREATED:
      if (!response.errors) { setPlaylistPathname(response); }
      break;

    case ActionTypes.PLAYLISTING_CREATED:
      if (!response.errors) { addTrackToPlaylist(response); }
      break;

    case ActionTypes.PLAYLISTING_DELETED:
      if (!response.errors) { removeTrackFromPlaylist(response); }
      break;

    case ActionTypes.USER_RECEIVED:
      if (!response.errors && response.playlists) {
        updatePlaylists(response);
      }
      break;

    case ActionTypes.CLIENT_RECEIVED:
      if (!response.errors && response.playlists) {
        updatePlaylists(response);
      }
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

PlaylistStore.getPlaylistsByUsername = function (username) {
  var playlists = _playlists[username] || {};
  var playlistsCopy = jQuery.extend({}, playlists);

  return playlistsCopy;
};

PlaylistStore.find = function (username, slug) {
  var playlist = (_playlists[username] ? _playlists[username][slug] : {});

  var playlistCopy = jQuery.extend({}, playlist);

  return playlistCopy;
};

PlaylistStore.playlistContainsTrack = function (playlistSlug, trackId) {
  var clientPlaylist = _clientPlaylists[playlistId];

  if (!clientPlaylist) { return; }

  var tracks = clientPlaylist.tracks;
  var foundIndex = -1;

  tracks.findIndex(function (possibleTrack, index) {
    if (possibleTrack.id === trackId) { foundIndex = index; }
  });

  return foundIndex !== -1;
};

PlaylistStore.getNewPlaylistPathname = function () {
  return _newPlaylistPathname;
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  PlaylistStore.__emitChange();
};

var resetPlaylists = function (playlists) {
  var username;
  _playlists = {};

  playlists.forEach(function (playlist) {
    username = playlist.user.username;

    _playlists[username] = _playlists[username] || {};
    _playlists[username][playlist.slug] = playlist;
  });

  PlaylistStore.__emitChange();
};

var updatePlaylists = function (response) {
  var username = response.username;
  var playlists = response.playlists;

  _playlists[username] = _playlists[username] || {};

  playlists.forEach(function (playlist) {
    _playlists[username][playlist.slug] = playlist;
  });

  PlaylistStore.__emitChange();
};

var resetPlaylist = function (playlist) {
  var username = playlist.user.username;

  _playlists[username] = _playlists[username] || {};
  _playlists[username][playlist.slug] = playlist;

  PlaylistStore.__emitChange();
};

var addTrackToPlaylist = function (response) {
  var username = response.username;
  var playlistSlug = response.playlist_slug;
  var addedTrack = response.track;

  var playlist = _playlists[username][playlistSlug];
  var tracks = playlist.tracks;

  tracks.push(addedTrack);

  PlaylistStore.__emitChange();
};

var removeTrackFromPlaylist = function (response) {
  var username = response.username;
  var playlistSlug = response.playlist_slug;
  var removedTrackId = response.track_id;

  var playlist = _playlists[username][playlistSlug];
  var tracks = playlist.tracks;

  for (var i = 0; i < tracks.length; i++) {
    if (tracks[i].id === removedTrackId) {
      tracks.splice(i, 1);
    }
  }

  PlaylistStore.__emitChange();
};

var setPlaylistPathname = function (playlist) {
  var username = playlist.user.username;
  var pathname = "/" + username + "/playlists/" + playlist.slug;

  _showModal = false;
  _newPlaylistPathname = pathname;

  PlaylistStore.__emitChange();
};

module.exports = PlaylistStore;
