var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _sessionToken = sessionStorage.getItem("session_token");
var _errors = [];

var SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.LOGIN_RESPONSE:

      if (response.errors) {
        setErrors(response.errors);
      } else {
        setSessionStorage(response);
      }

      break;

    case ActionTypes.LOGOUT_RESPONSE:
      removeSessionStorage(response);
      break;

  };
};

SessionStore.isLoggedIn = function () {
  return _sessionToken ? true : false;
};

SessionStore.getSessionToken = function () {
  return _sessionToken;
};

SessionStore.getErrors = function () {
  return _errors.slice();
};

var setSessionStorage = function (response) {
  _sessionToken = response.session_token;
  sessionStorage.setItem("session_token", _sessionToken);

  SessionStore.__emitChange();
};

var removeSessionStorage = function (response) {
  _sessionToken = null;
  sessionStorage.removeItem("session_token");

  SessionStore.__emitChange();
};

var setErrors = function (errors) {
  _errors = errors;

  SessionStore.__emitChange();
};

module.exports = SessionStore;
