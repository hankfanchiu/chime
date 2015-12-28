var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _client = {};
var _clientPlaylists = {};
var _clientTracks = {};
var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.LOGIN_RESPONSE:
      if (!response.errors) { setSession(response); }
      break;

    case ActionTypes.LOGOUT_RESPONSE:
      removeSession();
      break;

    case ActionTypes.CLIENT_RECEIVED:
      setClient(response);
      break;

    case ActionTypes.PLAYLISTING_CREATED:
      if (!response.errors) { addPlaylisting(response); }
      break;

    case ActionTypes.PLAYLISTING_DELETED:
      if (!response.errors) { removePlaylisting(response); }
      break;

  };
};

SessionStore.isLoggedIn = function () {
  return !!localStorage.getItem("client");
};

SessionStore.getClient = function () {
  var clientCopy = jQuery.extend({}, _client);

  return clientCopy;
};

SessionStore.getClientId = function () {
  return _client.id;
};

SessionStore.getClientUsername = function () {
  return _client.username || localStorage.getItem("client");
};

SessionStore.getClientTracks = function () {
  var tracks = [];

  Object.keys(_clientTracks).forEach(function (id) {
    tracks.push(_clientTracks[id]);
  });

  return tracks;
};

SessionStore.getClientPlaylists = function () {
  var playlists = [];

  Object.keys(_clientPlaylists).forEach(function (id) {
    playlists.push(_clientPlaylists[id]);
  });

  return playlists;
};

SessionStore.isClient = function (username) {
  return _client.username === username;
};

SessionStore.playlistContainsTrack = function (playlistId, trackId) {
  var clientPlaylist = _clientPlaylists[playlistId];

  if (!clientPlaylist) { return; }

  var tracks = clientPlaylist.tracks;
  var foundIndex = -1;

  tracks.findIndex(function (possibleTrack, index) {
    if (possibleTrack.id === trackId) { foundIndex = index; }
  });

  return foundIndex !== -1;
};

var setSession = function (user) {
  localStorage.setItem("client", user.username);
  setClient(user);
};

var removeSession = function () {
  sessionStorage.clear();
  localStorage.removeItem("client");
  removeClient();
};

var setClient = function (user) {
  _client = user;
  _setClientPlaylists(user.playlists);
  _setClientTracks(user.tracks);

  SessionStore.__emitChange();
};

var removeClient = function () {
  _client = {};
  _clientPlaylists = {};
  _clientTracks = {};

  SessionStore.__emitChange();
};

var _setClientPlaylists = function (playlists) {
  playlists.forEach(function (playlist) {
    _clientPlaylists[playlist.id] = playlist;
  });
};

var _setClientTracks = function (tracks) {
  tracks.forEach(function (track) {
    _clientTracks[track.id] = track;
  });
};

var addPlaylisting = function (playlisting) {
  var playlistId = playlisting.playlist.id;
  var clientPlaylist = _clientPlaylists[playlistId];
  var addedTrack = playlisting.track;

  if (!clientPlaylist) { return; }

  var tracks = clientPlaylist.tracks;
  tracks.push(addedTrack);

  SessionStore.__emitChange();
};

var removePlaylisting = function (playlisting) {
  var playlistId = playlisting.playlist.id;
  var clientPlaylist = _clientPlaylists[playlistId];
  var removedTrack = playlisting.track;

  if (!clientPlaylist) { return; }

  var tracks = clientPlaylist.tracks;
  for (var i = 0; i < tracks.length; i++) {
    if (tracks[i].id === removedTrack.id) {
      tracks.splice(i, 1);
    }
  }

  SessionStore.__emitChange();
};

module.exports = SessionStore;
