var SessionAPIUtils = require("../utils/session_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var SessionActions = {
  signUp: function (userData) {
    SessionAPIUtils.signUp(userData, SessionActions.receiveLogin);
  },

  login: function (userData) {
    SessionAPIUtils.login(userData, SessionActions.receiveLogin);
  },

  logout: function () {
    SessionAPIUtils.logout(SessionActions.receiveLogout);
  },

  receiveLogin: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGIN_RESPONSE,
      response: response
    });
  },

  receiveLogout: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGOUT_RESPONSE,
      response: response
    });
  }
};

module.exports = SessionActions;
