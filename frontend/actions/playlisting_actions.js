var PlaylistingAPIUtils = require("../utils/playlisting_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var PlaylistingActions = {
  // Request actions

  createPlaylisting: function (playlistingData) {
    PlaylistingAPIUtils.createPlaylisting(
      playlistingData,
      PlaylistingActions.receivePlaylisting
    );
  },

  deletePlaylisting: function (ids) {
    PlaylistingAPIUtils.deletePlaylisting(
      ids,
      PlaylistingActions.receivePlaylisting
    );
  },

  // Response actions

  receivePlaylisting: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLISTING_RECEIVED,
      response: response
    });
  }
};

module.exports = PlaylistingActions;
