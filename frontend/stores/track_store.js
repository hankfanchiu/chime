var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _tracks = {};
var TrackStore = new Store(AppDispatcher);

TrackStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.TRACKS_RECEIVED:
      if (!response.errors) {
        setTracks(response);
      }
      break;

    case ActionTypes.TRACK_RECEIVED:
      if (!response.errors) {
        setTrack(response);
      }
      break;

    case ActionTypes.TRACK_CREATED:
      if (!response.errors) {
        setTrack(response);
      }
      break;

    case ActionTypes.TRACK_UPDATED:
      if (!response.errors) {
        updateTrack(response);
      }
      break;

    case ActionTypes.TRACK_DELETED:
      if (!response.errors) {
        deleteTrack(response);
      }
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

TrackStore.getTracksByUsername = function (username) {
  var tracks = _tracks[username];

  return (tracks ? jQuery.extend({}, tracks) : null);
};

TrackStore.find = function (username, slug) {
  var userTracks = _tracks[username] || {};
  var track = userTracks[slug];

  return (track ? jQuery.extend({}, track) : null);
};

var setTracks = function (tracks) {
  var username;

  tracks.forEach(function (track) {
    username = track.user.username;

    _tracks[username] = _tracks[username] || {};
    _tracks[username][track.slug] = track;
  });

  TrackStore.__emitChange();
};

var updateTracks = function (response) {
  var tracks = response.tracks;
  var user = response.user;
  var username = user.username;

  tracks.forEach(function (track) {
    _tracks[username] = _tracks[username] || {};
    _tracks[username][track.slug] = track;
  });

  TrackStore.__emitChange();
};

var setTrack = function (response) {
  var track = response.track;
  var username = track.user.username;

  _tracks[username] = _tracks[username] || {};
  _tracks[username][track.slug] = track;

  TrackStore.__emitChange();
};

var updateTrack = function (response) {
  var oldSlug = response.old_slug;
  var updatedTrack = response.track;
  var newSlug = updatedTrack.slug;
  var username = updatedTrack.user.username;

  if (oldSlug !== newSlug) {
    delete _tracks[username][oldSlug];
  }

  _tracks[username][newSlug] = updatedTrack;

  TrackStore.__emitChange();
};

var deleteTrack = function (response) {
  var deletedTrack = response.track;
  var slug = deletedTrack.slug;
  var username = deletedTrack.username;

  delete _tracks[username][slug];

  TrackStore.__emitChange();
};


module.exports = TrackStore;
