var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _currentUser = { tracks: [], playlists: [] };
var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.LOGIN_RESPONSE:
      setSession(response);
      break;

    case ActionTypes.LOGOUT_RESPONSE:
      removeSession();
      break;

    case ActionTypes.CURRENT_USER_RECEIVED:
      setCurrentUser(response);
      break;

  };
};

SessionStore.isLoggedIn = function () {
  _currentUser.id = _currentUser.id || window.currentUserId;

  return !!_currentUser.id;
};

SessionStore.getCurrentUser = function () {
  var currentUserCopy = jQuery.extend({}, _currentUser);

  return currentUserCopy;
};

SessionStore.getCurrentUserId = function () {
  return _currentUser.id;
};

SessionStore.getCurrentUserUsername = function () {
  return _currentUser.username;
};

SessionStore.getCurrentUserTracks = function () {
  return _currentUser.tracks.slice();
};

SessionStore.getCurrentUserPlaylists = function () {
  return _currentUser.playlists.slice();
};

var setSession = function (user) {
  window.currentUserId = window.currentUserId || user.id;
  _currentUser = user;

  SessionStore.__emitChange();
};

var removeSession = function () {
  window.currentUserId = null;
  _currentUser = {};

  SessionStore.__emitChange();
};

var setCurrentUser = function (user) {
  _currentUser = user;

  SessionStore.__emitChange();
};

module.exports = SessionStore;
