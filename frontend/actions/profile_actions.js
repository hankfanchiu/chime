var AppDispatcher = require("../dispatcher/dispatcher");
var WebAPIUtils = require("../utils/web_api_utils");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var ProfileActions = {
  fetchProfile: function () {
    WebAPIUtils.fetchProfile(ProfileActions.receiveProfile);
  },

  updateProfile: function (userData) {
    WebAPIUtils.updateProfile(userData, ProfileActions.receiveProfile);
  },

  receiveProfile: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PROFILE_RECEIVED,
      response: response
    });
  },
};

module.exports = ProfileActions;
