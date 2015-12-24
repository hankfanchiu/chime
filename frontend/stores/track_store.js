var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _tracks = {};
var _newTrack = null;
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

    case ActionTypes.NEW_TRACK_RECEIVED:
      _newTrack = null;

      if (!response.errors) {
        addTrack(response);
      }

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

TrackStore.newTrack = function () {
  var newTrackCopy = (_newTrack ? jQuery.extend({}, _newTrack) : null);

  return newTrackCopy;
};

var resetTracks = function (tracks) {
  var trackIdentifier;

  _tracks = {};

  tracks.forEach(function (track) {
    trackIdentifier = track.user.username + "-" + track.slug;

    _tracks[trackIdentifier] = track;
  });

  TrackStore.__emitChange();
};

var resetTrack = function (track) {
  var trackIdentifier = track.user.username + "-" + track.slug;
  _tracks[trackIdentifier] = track;

  TrackStore.__emitChange();
};

var addTrack = function (track) {
  var trackIdentifier = track.user.username + "-" + track.slug;
  _tracks[trackIdentifier] = track;
  _newTrack = track;

  TrackStore.__emitChange();
};

module.exports = TrackStore;
