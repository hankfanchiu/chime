var PlaylistingAPIUtils = require("../utils/playlisting_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var PlaylistingActions = {
  createPlaylisting: function (playlistingData) {
    PlaylistingAPIUtils.createPlaylisting(
      playlistingData,
      PlaylistingActions.receivePlaylisting
    );
  },

  deletePlaylisting: function (playlistId, trackId) {
    PlaylistingAPIUtils.deletePlaylisting(
      playlistId,
      trackId,
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
