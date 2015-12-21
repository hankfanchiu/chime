var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _success = [];
var _errors = [];

var FlashStore = new Store(AppDispatcher);

FlashStore.__onDispatch = function (payload) {
  var response = payload.response;

  _success = response.success;
  _errors = response.errors;

  FlashStore.__emitChange();
};

FlashStore.success = function () {
  return _success.slice();
};

FlashStore.errors = function () {
  return _errors.slice();
};

module.exports = FlashStore;
