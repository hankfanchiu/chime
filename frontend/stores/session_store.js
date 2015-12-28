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

    case ActionTypes.PLAYLISTING_UPDATED:
      if (!response.errors) { updateClientPlaylist(response); }
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
  setClientPlaylists(user.playlists);
  setClientTracks(user.tracks);

  SessionStore.__emitChange();
};

var removeClient = function () {
  _client = {};
  _clientPlaylists = {};
  _clientTracks = {};

  SessionStore.__emitChange();
};

var setClientPlaylists = function (playlists) {
  playlists.forEach(function (playlist) {
    _clientPlaylists[playlist.id] = playlist;
  });
};

var setClientTracks = function (tracks) {
  tracks.forEach(function (track) {
    _clientTracks[track.id] = track;
  });
};

var updateClientPlaylist = function (playlisting) {
  var receivedPlaylist = playlisting.playlist;
  _clientPlaylists[receivedPlaylist.id] = receivedPlaylist;

  SessionStore.__emitChange();
};

module.exports = SessionStore;
