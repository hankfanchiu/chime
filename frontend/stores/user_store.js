var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _users = {};
var UserStore = new Store(AppDispatcher);

UserStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.USER_RECEIVED:
      resetUser(response);
      break;

    case ActionTypes.CLIENT_RECEIVED:
      resetUser(response);
      break;
  };
};

UserStore.getUser = function (username) {
  var user = _users[username] || {};
  var userCopy = jQuery.extend({}, user);

  return userCopy;
};

UserStore.getPlaylists = function (username) {
  var user = _users[username] || {};
  var playlists = user.playlists || [];

  return playlists.slice();
};

var resetUser = function (user) {
  _users[user.username] = user;

  UserStore.__emitChange();
};

module.exports = UserStore;
