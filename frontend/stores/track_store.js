var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _tracks = {};
var TrackStore = new Store(AppDispatcher);

TrackStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.TRACKS_RECEIVED:
      resetTracks(response);
      break;

    case ActionTypes.TRACK_RECEIVED:
      resetTrack(response);
      break;
  };
};

TrackStore.all = function () {
  var tracksCopy = jQuery.extend({}, _tracks);

  return tracksCopy;
};

TrackStore.find = function (title) {
  var track = _tracks[title];

  return track;
};

var resetTracks = function (tracks) {
  _tracks = {};

  tracks.forEach(function (track) {
    _tracks[track.title] = track;
  });

  TrackStore.__emitChange();
};

var resetTrack = function (track) {
  _tracks[track.title] = track;

  TrackStore.__emitChange();
};

module.exports = TrackStore;
