var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showEditModal = false;
var _updatedTrackPathname = null;
var _showDeleteModal = false;
var _trackDeleted = false;
var _tracks = {};

var TrackStore = new Store(AppDispatcher);

TrackStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  _updatedTrackPathname = null;
  _trackDeleted = false;

  switch (actionType) {

    case ActionTypes.SHOW_EDIT_TRACK_MODAL:
      setShowEditModal(true);
      break;

    case ActionTypes.CLOSE_EDIT_TRACK_MODAL:
      setShowEditModal(false);
      break;

    case ActionTypes.SHOW_DELETE_TRACK_MODAL:
      setShowDeleteModal(true);
      break;

    case ActionTypes.CLOSE_DELETE_TRACK_MODAL:
      setShowDeleteModal(false);
      break;

    case ActionTypes.TRACKS_RECEIVED:
      if (!response.errors) { resetTracks(response); }
      break;

    case ActionTypes.TRACK_RECEIVED:
      if (!response.errors) { setTrack(response); }
      break;

    case ActionTypes.TRACK_CREATED:
      if (!response.errors) { addTrack(response); }
      break;

    case ActionTypes.TRACK_UPDATED:
      if (!response.errors) { updateTrack(response); }
      break;

    case ActionTypes.TRACK_DELETED:
      if (!response.errors) { deleteTrack(response); }
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

TrackStore.showEditModal = function () {
  return _showEditModal;
};

TrackStore.showDeleteModal = function () {
  return _showDeleteModal;
};

TrackStore.getUpdatedTrackPathname = function () {
  return _updatedTrackPathname;
};

TrackStore.getTrackDeleted = function () {
  return _trackDeleted;
};

TrackStore.getTracksByUsername = function (username) {
  var tracks = _tracks[username];

  if (!tracks) { return null; }

  return jQuery.extend({}, tracks);
};

TrackStore.find = function (username, slug) {
  var userTracks = _tracks[username] || {};
  var track = _tracks[username][slug];

  if (!track) { return null; }

  return jQuery.extend({}, track);
};

var setShowEditModal = function (boolean) {
  _showEditModal = boolean;

  TrackStore.__emitChange();
};

var setShowDeleteModal = function (boolean) {
  _showDeleteModal = boolean;

  TrackStore.__emitChange();
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
  var user = response.user;
  var tracks = response.tracks;

  _tracks[user.username] = _tracks[user.username] || {};

  tracks.forEach(function (track) {
    _tracks[user.username][track.slug] = track;
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

var addTrack = function (response) {
  var newTrack = response.track;
  var username = newTrack.user.username;

  _tracks[username] = _tracks[username] || {};
  _tracks[username][newTrack.slug] = newTrack;

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
  _updatedTrackPathname = "/" + username + "/" + newSlug;
  _showEditModal = false;

  TrackStore.__emitChange();
};

var deleteTrack = function (response) {
  var deletedTrack = response.track;
  var slug = deletedTrack.slug;
  var username = deletedTrack.username;

  delete _tracks[username][slug];

  _trackDeleted = true;
  _showDeleteModal = false;

  TrackStore.__emitChange();
};


module.exports = TrackStore;
