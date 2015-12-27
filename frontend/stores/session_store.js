var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _client = { tracks: [], playlists: [] };
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
  return _client.tracks.slice();
};

SessionStore.getClientPlaylists = function () {
  return _client.playlists.slice();
};

SessionStore.isClient = function (username) {
  return _client.username === username;
};

var setSession = function (user) {
  localStorage.setItem("client", user.username);
  _client = user;

  SessionStore.__emitChange();
};

var removeSession = function () {
  sessionStorage.clear();
  localStorage.removeItem("client");
  _client = {};

  SessionStore.__emitChange();
};

var setClient = function (user) {
  _client = user;

  SessionStore.__emitChange();
};

module.exports = SessionStore;
