var AppDispatcher = require("../dispatcher/dispatcher");
var WebAPIUtils = require("../utils/web_api_utils");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var SessionActions = {
  signUp: function (userData) {
    WebAPIUtils.signUp(userData, SessionActions.receiveLogin);
  },

  login: function (userData) {
    WebAPIUtils.login(userData, SessionActions.receiveLogin);
  },

  logout: function () {
    WebAPIUtils.logout(SessionActions.receiveLogout);
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
