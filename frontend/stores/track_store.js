var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _tracks = [];

var TrackStore = new Store(AppDispatcher);

TrackStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var tracks = payload.tracks;

  switch (actionType) {

    case ActionTypes.TRACKS_RECEIVED:
      resetTracks(tracks);
      break;

  };
};

TrackStore.all = function () {
  return _tracks.slice();
};

var resetTracks = function (tracks) {
  _tracks = tracks;

  TrackStore.__emitChange();
};

module.exports = TrackStore;
