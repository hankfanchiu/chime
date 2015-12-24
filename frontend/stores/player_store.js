var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var playRequested = false;
var pauseRequested = false;
var seekTo = null;
var adjustVolumeTo = null;

var _queue = [];
var _queueIndex = 0;
var _track = {};
var _playlist = {};

var PlayerStore = new Store(AppDispatcher);

PlayerStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var track = payload.track;
  var playlist = payload.playlist;
  var response = payload.response

  switch (actionType) {

    case ActionTypes.PLAY_AUDIO:
      setPlayRequest();
      break;

    case ActionTypes.PAUSE_AUDIO:
      setPauseRequest();
      break;

    case ActionTypes.SEEK_TO:
      setSeekTo(response);
      break;

    case ActionTypes.ADJUST_VOLUME_TO:
      setAdjustVolumeTo(response);
      break;

    case ActionTypes.PLAY_TRACK_NOW:
      resetTrackAndQueue(track);
      break;

    case ActionTypes.PLAY_NEXT_TRACK:
      loadNextTrackInQueue();
      break;

    case ActionTypes.PLAY_PREVIOUS_TRACK:
      loadPreviousTrackInQueue();
      break;

    case ActionTypes.AUTO_PLAY_TRACK:
      loadNextTrackUntilEnd();
      break;

    case ActionTypes.ADD_TRACK_TO_QUEUE:
      pushTrackToQueue(track);
      break;

    case ActionTypes.LOAD_PLAYLIST:
      loadPlaylistToQueue(playlist);
      break;
  };
};


PlayerStore.playRequested = function () {
  return playRequested;
};

PlayerStore.pauseRequested = function () {
  return pauseRequested;
};

PlayerStore.getSeekTo = function () {
  return seekTo;
};

PlayerStore.getAdjustVolumeTo = function () {
  return adjustVolumeTo;
};

PlayerStore.getTrack = function () {
  var trackCopy = jQuery.extend({}, _track);

  return trackCopy;
};

PlayerStore.getNextTrack = function () {
  var nextTrack = _queue[_queueIndex + 1];
  var nextTrackCopy;

  if (nextTrack === undefined) { return null; }

  nextTrackCopy = jQuery.extend({}, nextTrack);

  return nextTrackCopy;
}

PlayerStore.queueIsEmpty = function () {
  return (_queue.length === 0);
};

PlayerStore.queueIsEnded = function () {
  return (_queueIndex === _queue.length - 1);
};

PlayerStore.isInQueue = function (track) {
  return (_queue.indexOf(track) !== -1);
};

PlayerStore.isCurrentTrack = function (track) {
  return _track === track;
};

var resetRequests = function () {
  playRequested = false;
  pauseRequested = false;
  seekTo = null;
  adjustVolumeTo = null;
};

var setPlayRequest = function () {
  resetRequests();
  playRequested = true;

  PlayerStore.__emitChange();
};

var setPauseRequest = function () {
  resetRequests();
  pauseRequested = true;

  PlayerStore.__emitChange();
};

var setSeekTo = function (response) {
  resetRequests();
  seekTo = response;

  PlayerStore.__emitChange();
};

var setAdjustVolumeTo = function (response) {
  resetRequests();
  adjustVolumeTo = response;

  PlayerStore.__emitChange();
};

var resetTrackAndQueue = function (track) {
  _queue = [track];
  _queueIndex = 0;
  _track = track;

  PlayerStore.__emitChange();
};

var loadNextTrackInQueue = function () {
  if ((_queue.length === 0) || (_queue.length === 1)) { return; }

  if (_queueIndex === _queue.length - 1) {
    _queueIndex = 0;
  } else {
    _queueIndex += 1;
  }

  _track = _queue[_queueIndex];

  PlayerStore.__emitChange();
};

var loadPreviousTrackInQueue = function () {
  if ((_queue.length === 0) || (_queue.length === 1)) { return; }

  if (_queueIndex === 0) {
    _queueIndex = _queue.length - 1;
  } else {
    _queueIndex -= 1;
  }

  _track = _queue[_queueIndex];

  PlayerStore.__emitChange();
};

var loadNextTrackUntilEnd = function () {
  if (_queue.length === 0) { return; }
  if (_queueIndex === _queue.length - 1) { return; }

  _queueIndex += 1;

  _track = _queue[_queueIndex];

  PlayerStore.__emitChange();
};

var pushTrackToQueue = function (track) {
  if (!PlayerStore.isInQueue(track)) { _queue.push(track); }

  PlayerStore.__emitChange();
};

var loadPlaylistToQueue = function (playlist) {
  _playlist = playlist;
  _queue = playlist.tracks;
  _queueIndex = 0;
  _track = _queue[_queueIndex];

  PlayerStore.__emitChange();
};

module.exports = PlayerStore;
