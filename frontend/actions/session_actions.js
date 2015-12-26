var SessionAPIUtils = require("../utils/session_api_utils");
var UserAPIUtils = require("../utils/user_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var SessionActions = {
  // Sign up modal actions

  showSignUpModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_SIGN_UP_MODAL
    });
  },

  closeSignUpModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_SIGN_UP_MODAL
    });
  },

  // Login modal actions

  showLoginModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_LOGIN_MODAL
    });
  },

  closeLoginModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_LOGIN_MODAL
    });
  },

  // Request actions

  login: function (userData) {
    SessionAPIUtils.login(userData, SessionActions.receiveLogin);
  },

  logout: function () {
    SessionAPIUtils.logout(SessionActions.receiveLogout);
  },

  fetchCurrentUser: function (currentUserId) {
    UserAPIUtils.fetchUser(currentUserId, SessionActions.receiveCurrentUser);
  },

  // Response actions

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
  },

  receiveCurrentUser: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CURRENT_USER_RECEIVED,
      response: response
    });
  }
};

module.exports = SessionActions;
