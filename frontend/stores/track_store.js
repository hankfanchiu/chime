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
      if (!response.errors) { resetTracks(response); }
      break;

    case ActionTypes.TRACK_RECEIVED:
      if (!response.errors) { resetTrack(response); }
      break;

    case ActionTypes.TRACK_CREATED:
      if (!response.errors) { resetTrack(response); }
      break;

    case ActionTypes.USER_RECEIVED:
      if (!response.errors && response.tracks) {
        updateTracks(response);
      }
      break;

    case ActionTypes.CLIENT_RECEIVED:
      if (!response.errors && response.tracks) {
        updateTracks(response);
      }
      break;

  };
};

TrackStore.all = function () {
  var tracksCopy = jQuery.extend({}, _tracks);

  return tracksCopy;
};

TrackStore.getTracksByUsername = function (username) {
  var tracks = _tracks[username] || {};
  var tracksCopy = jQuery.extend({}, tracks);

  return tracksCopy;
};

TrackStore.find = function (username, slug) {
  var track = (_tracks[username] ? _tracks[username][slug] : {});

  var trackCopy = jQuery.extend({}, track);

  return trackCopy;
};

var resetTracks = function (tracks) {
  var username;
  _tracks = {};

  tracks.forEach(function (track) {
    username = track.user.username;

    _tracks[username] = _tracks[username] || {};
    _tracks[username][track.slug] = track;
  });

  TrackStore.__emitChange();
};

var updateTracks = function (response) {
  var username = response.username;
  var tracks = response.tracks;

  _tracks[username] = _tracks[username] || {};

  tracks.forEach(function (track) {
    _tracks[username][track.slug] = track;
  });

  TrackStore.__emitChange();
};

var resetTrack = function (track) {
  var username = track.user.username;

  _tracks[username] = _tracks[username] || {};
  _tracks[username][track.slug] = track;

  TrackStore.__emitChange();
};


module.exports = TrackStore;
