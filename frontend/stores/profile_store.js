var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _userProfile = {};
var _errors = [];

var ProfileStore = new Store(AppDispatcher);

ProfileStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.PROFILE_RECEIVED:
      if (response.errors) {
        setErrors(response.errors);
      } else {
        setUserProfile(response);
      }

      break;

    case ActionTypes.LOGOUT_RESPONSE:
      _userProfile = null;
      break;
  };
};

ProfileStore.getProfile = function () {
  var userProfileCopy = jQuery.extend({}, _userProfile);

  return userProfileCopy;
};

ProfileStore.getErrors = function () {
  return _errors.slice();
};

var setUserProfile = function (userProfile) {
  _userProfile = userProfile;

  ProfileStore.__emitChange();
};

var setErrors = function (errors) {
  _errors = errors;

  ProfileStore.__emitChange();
}

module.exports = ProfileStore;
