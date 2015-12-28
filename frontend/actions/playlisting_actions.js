var PlaylistingAPIUtils = require("../utils/playlisting_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var PlaylistingActions = {
  // Request actions

  createPlaylisting: function (ids) {
    PlaylistingAPIUtils.createPlaylisting(
      ids,
      PlaylistingActions.receivePlaylistingCreated
    );
  },

  deletePlaylisting: function (ids) {
    PlaylistingAPIUtils.deletePlaylisting(
      ids,
      PlaylistingActions.receivePlaylistingDeleted
    );
  },

  // Response actions

  receivePlaylistingCreated: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLISTING_CREATED,
      response: response
    });
  },

  receivePlaylistingDeleted: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.PLAYLISTING_DELETED,
      response: response
    });
  }
};

module.exports = PlaylistingActions;
