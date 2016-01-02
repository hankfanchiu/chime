var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _success = [];
var _errors = [];
var FlashStore = new Store(AppDispatcher);

FlashStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.LOGIN_RESPONSE:
      clearFlash();
      break;

    case ActionTypes.USER_CREATED:
      clearFlash();
      break;

    default:
      setFlash(response);
      break;
  };
};

FlashStore.success = function () {
  return _success.slice();
};

FlashStore.errors = function () {
  return _errors.slice();
};

var setFlash = function (response) {
  _success = response.success || [];
  _errors = response.errors || [];

  FlashStore.__emitChange();
};

var clearFlash = function () {
  _success = [];
  _errors = [];
};

module.exports = FlashStore;
