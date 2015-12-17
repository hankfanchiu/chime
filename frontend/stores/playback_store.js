var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _track = {};

var PlaybackStore = new Store(AppDispatcher);

PlaybackStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var track = payload.track;

  switch (actionType) {

    case ActionTypes.PLAYBACK_TRACK_RECEIVED:
      resetTrack(track);
      break;
  };
};

PlaybackStore.getTrack = function () {
  var trackCopy = jQuery.extend({}, _track);
  
  return trackCopy;
};

var resetTrack = function (track) {
  _track = track;

  PlaybackStore.__emitChange();
};

module.exports = PlaybackStore;
