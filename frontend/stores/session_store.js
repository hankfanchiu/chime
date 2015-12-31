var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _client = {};
var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.SIGN_UP_RESPONSE:
      if (!response.errors) { setSession(response); }
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (!response.errors) { setSession(response); }
      break;

    case ActionTypes.LOGOUT_RESPONSE:
      removeSession();
      break;

    case ActionTypes.CLIENT_RECEIVED:
      if (!response.errors) { setClient(response); }
      break;

    case ActionTypes.CLIENT_UPDATED:
      if (!response.errors) { updateClient(response); }
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

var updateClient = function (response) {
  _client = response.user;

  SessionStore.__emitChange();
};

module.exports = SessionStore;
