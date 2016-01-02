var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showModal = false;
var _playlists = {};
var _newPlaylistPathname = null;
var PlaylistStore = new Store(AppDispatcher);

PlaylistStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  _newPlaylistPathname = null;

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
      if (!response.errors) { setPlaylist(response); }
      break;

    case ActionTypes.PLAYLIST_CREATED:
      if (!response.errors) { addPlaylist(response); }
      break;

    case ActionTypes.PLAYLIST_UPDATED:
      if (!response.errors) { updatePlaylist(response); }
      break;

    case ActionTypes.PLAYLIST_DELETED:
      if (!response.errors) { deletePlaylist(response); }
      break;

    case ActionTypes.PLAYLISTING_CREATED:
      if (!response.errors) { addTrackToPlaylist(response); }
      break;

    case ActionTypes.PLAYLISTING_DELETED:
      if (!response.errors) { removeTrackFromPlaylist(response); }
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (!response.errors && response.playlists) {
        updatePlaylists(response);
      }
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
  var user = response.user;
  var username = user.username;
  var playlists = response.playlists;

  _playlists[username] = _playlists[username] || {};

  playlists.forEach(function (playlist) {
    _playlists[username][playlist.slug] = playlist;
  });

  PlaylistStore.__emitChange();
};

var setPlaylist = function (response) {
  var playlist = response.playlist;
  var username = playlist.user.username;

  _playlists[username] = _playlists[username] || {};
  _playlists[username][playlist.slug] = playlist;

  PlaylistStore.__emitChange();
};

var addPlaylist = function (playlist) {
  var username = playlist.user.username;
  var pathname = "/" + username + "/playlists/" + playlist.slug;

  _showModal = false;
  _newPlaylistPathname = pathname;

  PlaylistStore.__emitChange();
};

var updatePlaylist = function (response) {
  var oldSlug = response.old_slug;
  var updatedPlaylist = response.playlist;
  var newSlug = updatedPlaylist.slug;
  var username = updatedPlaylist.user.username;

  if (oldSlug !== newSlug) {
    delete _playlists[username][oldSlug];
  }

  _playlists[username][newSlug] = updatedPlaylist;
  _updatedPlaylistPathname = "/" + username + "/playlists/" + newSlug;
  _showEditModal = false;

  PlaylistStore.__emitChange();
};

var deletePlaylist = function (response) {
  var deletedPlaylist = response.playlist;
  var slug = deletedPlaylist.slug;
  var username = deletedPlaylist.username;

  delete _playlists[username][slug];

  _playlistDeleted = true;
  _showDeleteModal = false;

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

module.exports = PlaylistStore;
