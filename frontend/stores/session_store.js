var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _session = false;
var _errors = [];

var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function (payload) {
  var response = payload.response;

  switch (payload.actionType) {

    case ActionTypes.LOGIN_RESPONSE:
      if (response.errors) {
        _errors = response.errors;
      } else {
        _session = true;
      }

      SessionStore.__emitChange();
      break;

    case ActionTypes.LOGOUT_RESPONSE:
      window.currentUserId = null;
      _session = false;
      SessionStore.__emitChange();
      break;

  };
};

SessionStore.isLoggedIn = function () {
  if (window.currentUserId) { _session = true; }

  return _session;
};

SessionStore.getErrors = function () {
  return _errors.slice();
};

module.exports = SessionStore;
