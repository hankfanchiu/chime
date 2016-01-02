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
      if (!response.errors) { setUser(response); }
      break;

    case ActionTypes.USER_CREATED:
      if (!response.errors) { setUser(response); }
      break;

    case ActionTypes.USER_UPDATED:
      if (!response.errors) { setUser(response); }
      break;

    case ActionTypes.CLIENT_RECEIVED:
      if (!response.errors) { setUser(response); }
      break;

  };
};

UserStore.find = function (username) {
  var user = _users[username] || {};
  var userCopy = jQuery.extend({}, user);

  return userCopy;
};

var setUser = function (response) {
  var user = response.user;
  
  _users[user.username] = user;

  UserStore.__emitChange();
};

module.exports = UserStore;
