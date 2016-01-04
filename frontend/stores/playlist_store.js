var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _playlists = {};
var PlaylistStore = new Store(AppDispatcher);

PlaylistStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.PLAYLISTS_RECEIVED:
      if (!response.errors) {
        resetPlaylists(response);
      }
      break;

    case ActionTypes.PLAYLIST_RECEIVED:
      if (!response.errors) {
        setPlaylist(response);
      }
      break;

    case ActionTypes.PLAYLIST_CREATED:
      if (!response.errors) {
        setPlaylist(response);
      }
      break;

    case ActionTypes.PLAYLIST_UPDATED:
      if (!response.errors) {
        updatePlaylist(response);
      }
      break;

    case ActionTypes.PLAYLIST_DELETED:
      if (!response.errors) {
        deletePlaylist(response);
      }
      break;

    case ActionTypes.PLAYLISTING_CREATED:
      if (!response.errors) {
        addTrackToPlaylist(response);
      }
      break;

    case ActionTypes.PLAYLISTING_DELETED:
      if (!response.errors) {
        removeTrackFromPlaylist(response);
      }
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

PlaylistStore.getPlaylistsByUsername = function (username) {
  var userPlaylists = _playlists[username];

  return (userPlaylists ? jQuery.extend({}, userPlaylists) : null);
};

PlaylistStore.find = function (username, slug) {
  var userPlaylists = _playlists[username] || {};
  var foundPlaylist = userPlaylists[slug];

  return (foundPlaylist ? jQuery.extend({}, foundPlaylist) : null);
};

PlaylistStore.playlistContainsTrack = function (playlistSlug, trackId) {
  var clientPlaylist = _clientPlaylists[playlistId];

  if (!clientPlaylist) { return false; }

  var foundIndex = clientPlaylist.tracks.findIndex(function (track) {
    return (track.id === trackId);
  });

  return (foundIndex !== -1);
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
  var playlists = response.playlists;
  var user = response.user;
  var username = user.username;

  playlists.forEach(function (playlist) {
    _playlists[username] = _playlists[username] || {};
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

var updatePlaylist = function (response) {
  var oldSlug = response.old_slug;
  var updatedPlaylist = response.playlist;
  var newSlug = updatedPlaylist.slug;
  var username = updatedPlaylist.user.username;

  if (oldSlug !== newSlug) {
    delete _playlists[username][oldSlug];
  }

  _playlists[username][newSlug] = updatedPlaylist;

  PlaylistStore.__emitChange();
};

var deletePlaylist = function (response) {
  var deletedPlaylist = response.playlist;
  var slug = deletedPlaylist.slug;
  var username = deletedPlaylist.username;

  delete _playlists[username][slug];

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
