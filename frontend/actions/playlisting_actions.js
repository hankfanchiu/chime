var PlaylistingAPIUtils = require("../utils/playlisting_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var PlaylistingActions = {
  // Request actions

  createPlaylisting: function (ids) {
    PlaylistingAPIUtils.createPlaylisting(
      ids,
      PlaylistingActions.receivePlaylistUpdate
    );
  },

  deletePlaylisting: function (ids) {
    PlaylistingAPIUtils.deletePlaylisting(
      ids,
      PlaylistingActions.receivePlaylistUpdate
    );
  },

  // Response actions

  receivePlaylistUpdate: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLIST_UPDATED,
      response: response
    });
  }
};

module.exports = PlaylistingActions;
