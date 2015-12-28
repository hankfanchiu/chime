var PlaylistingAPIUtils = require("../utils/playlisting_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var PlaylistingActions = {
  // Request actions

  createPlaylisting: function (ids) {
    PlaylistingAPIUtils.createPlaylisting(
      ids,
      PlaylistingActions.receivePlaylistingUpdate
    );
  },

  deletePlaylisting: function (ids) {
    PlaylistingAPIUtils.deletePlaylisting(
      ids,
      PlaylistingActions.receivePlaylistingUpdate
    );
  },

  // Response actions

  receivePlaylistingUpdate: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLISTING_UPDATED,
      response: response
    });
  }
};

module.exports = PlaylistingActions;
