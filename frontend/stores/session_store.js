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
      if (!response.errors) { setClient(response); }
      break;

  };
};

SessionStore.isLoggedIn = function () {
  return !!localStorage.getItem("client");
};

SessionStore.isClient = function (username) {
  return _client.username === username;
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

module.exports = SessionStore;
