var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _user = {};
var UserStore = new Store(AppDispatcher);

UserStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var user = payload.response;
  debugger;

  switch (actionType) {

    case ActionTypes.USER_RECEIVED:
      resetUser(user);
      break;

  };
};

UserStore.getUser = function () {
  var userCopy = jQuery.extend({}, _user);

  return userCopy;
};

UserStore.getTracks = function () {
  return _user.tracks.slice();
};

UserStore.getPlaylists = function () {
  return _user.playlists.slice();
};

var resetUser = function (user) {
  _user = user;

  UserStore.__emitChange();
};

module.exports = UserStore;
