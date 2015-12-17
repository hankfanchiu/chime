var AppDispatcher = require("../dispatcher/dispatcher");
var WebAPIUtils = require("../utils/web_api_utils");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var PlaylistingActions = {
  createPlaylisting: function (playlistingData) {
    WebAPIUtils.createPlaylisting(
      playlistingData,
      PlaylistingActions.receivePlaylisting
    );
  },

  receivePlaylisting: function (response) {
    AppDispatcher.dispatch({
      actionType: AppConstants.PLAYLISTING_RECEIVED,
      response: response
    });
  }
};

module.exports = PlaylistingActions;
