var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _currentUserId = null;
var _errors = [];

var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function (payload) {
  var response = payload.response;

  switch (payload.actionType) {

    case ActionTypes.LOGIN_RESPONSE:
      if (response.errors) {
        _errors = response.errors;
      } else {
        _currentUserId = response.id;
      }

      SessionStore.__emitChange();
      break;

    case ActionTypes.LOGOUT_RESPONSE:
      removeSession();
      break;

  };
};

SessionStore.isLoggedIn = function () {
  if (window.currentUserId) { _currentUserId = window.currentUserId; }

  return (_currentUserId ? true : false);
};

SessionStore.getUserId = function () {
  return _currentUserId;
};

SessionStore.getErrors = function () {
  return _errors.slice();
};

var removeSession = function () {
  window.currentUserId = null;
  _currentUserId = null;

  SessionStore.__emitChange();
};

module.exports = SessionStore;
