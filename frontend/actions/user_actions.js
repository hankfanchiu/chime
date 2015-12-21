var UserAPIUtils = require("../utils/user_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var UserActions = {
  // Request actions

  fetchUser: function (username) {
    UserAPIUtils.fetchUser(username, UserActions.receiveUser);
  },

  createUser: function (userData) {
    UserAPIUtils.createUser(userData, UserActions.receiveLogin);
  },

  updateUser: function (userId, userData) {
    UserAPIUtils.updateUser(userId, userData, UserActions.receiveUser);
  },

  // Response actions

  receiveUser: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_RECEIVED,
      response: response
    });
  },

  receiveLogin: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGIN_RESPONSE,
      response: response
    });
  }
};

module.exports = UserActions;
