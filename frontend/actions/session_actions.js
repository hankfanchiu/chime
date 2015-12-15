var AppDispatcher = require("../dispatcher/dispatcher");
var WebAPIUtils = require("../utils/web_api_utils");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var SessionActions = {
  signup: function (email, password) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SIGNUP_REQUEST,
      email: email,
      password: password
    });

    WebAPIUtils.signup(email, password);
  },

  login: function (email, password) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGIN_REQUEST,
      email: email,
      password: password
    });

    WebAPIUtils.login(email, password);
  },

  logout: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.LOGOUT_REQUEST
    });

    WebAPIUtils.logout();
  },

  receiveSignUp: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SIGNUP_RESPONSE,
      response: response
    });
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
