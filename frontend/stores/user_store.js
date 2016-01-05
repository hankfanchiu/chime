var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _users = {};
var _isUploadingAvatar = false;
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

    case ActionTypes.UPLOAD_AVATAR_INITIATED:
      setIsUploadingAvatar();
      break;

    case ActionTypes.USER_UPDATED:
      _isUploadingAvatar = false;
      if (!response.errors) { setUser(response); }
      break;

    case ActionTypes.CLIENT_RECEIVED:
      if (!response.errors) { setUser(response); }
      break;
  };
};

UserStore.find = function (username) {
  var user = _users[username];

  return (user ? jQuery.extend({}, user) : null);
};

UserStore.isUploadingAvatar = function () {
  return _isUploadingAvatar;
};

var setUser = function (response) {
  var user = response.user;

  _users[user.username] = user;

  UserStore.__emitChange();
};

var setIsUploadingAvatar = function () {
  _isUploadingAvatar = true;

  UserStore.__emitChange();
};

module.exports = UserStore;
