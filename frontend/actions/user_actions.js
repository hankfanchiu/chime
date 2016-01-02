var UserAPIUtils = require("../utils/user_api_utils");
var UploadAPIUtils = require("../utils/upload_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var UserActions = {
  // UI actions

  showSettingsModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_SETTINGS_MODAL
    });
  },

  closeSettingsModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_SETTINGS_MODAL
    });
  },

  // Request actions

  fetchUser: function (username) {
    UserAPIUtils.fetchUser(username, UserActions.receiveUser);
  },

  createUser: function (userData) {
    UserAPIUtils.createUser(userData, UserActions.receiveUserCreated);
  },

  updateUser: function (userId, formData) {
    UserAPIUtils.updateUser(userId, formData, UserActions.receiveUserUpdated);
  },

  // Response actions

  receiveUser: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_RECEIVED,
      response: response
    });
  },

  receiveUserCreated: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_CREATED,
      response: response
    });
  },

  receiveUserUpdated: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_UPDATED,
      response: response
    });
  }
};

module.exports = UserActions;
