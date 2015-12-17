var AppDispatcher = require("../dispatcher/dispatcher");
var WebAPIUtils = require("../utils/web_api_utils");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var ProfileActions = {
  // Current user profile
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
