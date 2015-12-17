var WebAPIUtils = require("../utils/web_api_utils");
var UserAPIUtils = require("../utils/user_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var ProfileActions = {
  // Current user profile
  fetchUser: function (userId) {
    UserAPIUtils.fetchUser(userId, ProfileActions.receiveUser);
  },

  updateUser: function (userId, userData) {
    UserAPIUtils.updateUser(userId, userData, ProfileActions.receiveUser);
  },

  receiveUser: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.USER_RECEIVED,
      response: response
    });
  },

  // Current user playlists
  fetchPlaylists: function () {
    WebAPIUtils.fetchPlaylists(ProfileActions.receivePlaylists);
  },

  receivePlaylists: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLISTS_RECEIVED,
      response: response
    });
  }
};

module.exports = ProfileActions;
