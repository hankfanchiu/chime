var UserAPIUtils = require("../utils/user_api_utils");
var UploadAPIUtils = require("../utils/upload_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var UserActions = {
  // UI actions

  showSettings: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_SETTINGS_MODAL
    });
  },

  closeSettings: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_SETTINGS_MODAL
    });
  },

  // Request actions

  fetchUser: function (username) {
    UserAPIUtils.fetchUser(username, UserActions.receiveUser);
  },

  createUser: function (userData) {
    UserAPIUtils.createUser(userData, UserActions.receiveSignUpResponse);
  },

  updateUser: function (userId, formData) {
    UserAPIUtils.updateUser(userId, formData, UserActions.receiveClientUpdated);
  },

  uploadImage: function (userId, formData) {
    UserAPIUtils.uploadImage(userId, formData, UserActions.receiveClient);
  },

  // Response actions

  receiveUser: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_RECEIVED,
      response: response
    });
  },

  receiveSignUpResponse: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SIGN_UP_RESPONSE,
      response: response
    });
  },

  receiveClient: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLIENT_RECEIVED,
      response: response
    });
  },

  receiveClientUpdated: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLIENT_UPDATED,
      response: response
    });
  }
};

module.exports = UserActions;
