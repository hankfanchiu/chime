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
      if (!response.errors) { resetTrack(response); }
      break;

    case ActionTypes.NEW_TRACK_RECEIVED:
      if (!response.errors) { resetTrack(response); }
      break;

  };
};

TrackStore.all = function () {
  var tracksCopy = jQuery.extend({}, _tracks);

  return tracksCopy;
};

TrackStore.find = function (slug) {
  var track = _tracks[slug] || {};
  var trackCopy = jQuery.extend({}, track);

  return trackCopy;
};

var resetTracks = function (tracks) {
  var identifier;

  _tracks = {};

  tracks.forEach(function (track) {
    identifier = track.user.username + "-" + track.slug;

    _tracks[identifier] = track;
  });

  TrackStore.__emitChange();
};

var resetTrack = function (track) {
  var identifier = track.user.username + "-" + track.slug;
  _tracks[identifier] = track;

  TrackStore.__emitChange();
};


module.exports = TrackStore;
