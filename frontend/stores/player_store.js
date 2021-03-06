var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _playRequested = false;
var _pauseRequested = false;
var _seekTo = null;
var _adjustVolumeTo = null;

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

    case ActionTypes.RESET_PLAYER_REQUESTS:
      resetRequests();
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
  return _playRequested;
};

PlayerStore.pauseRequested = function () {
  return _pauseRequested;
};

PlayerStore.getSeekTo = function () {
  return _seekTo;
};

PlayerStore.getAdjustVolumeTo = function () {
  return _adjustVolumeTo;
};

PlayerStore.getTrack = function () {
  var trackCopy = jQuery.extend({}, _track);

  return trackCopy;
};

PlayerStore.getNextTrack = function () {
  var nextTrack = _queue[_queueIndex + 1];
  var nextTrackCopy;

  if (nextTrack === undefined) {
    nextTrackCopy = null;
  } else {
    nextTrackCopy = jQuery.extend({}, nextTrack);
  }

  return nextTrackCopy;
};

PlayerStore.isCurrentTrack = function (track) {
  return (_track.id === track.id);
};

PlayerStore.queueIsEmpty = function () {
  return (_queue.length === 0);
};

var setPlayRequest = function () {
  _playRequested = true;

  PlayerStore.__emitChange();
};

var setPauseRequest = function () {
  _pauseRequested = true;

  PlayerStore.__emitChange();
};

var setSeekTo = function (time) {
  _seekTo = time;

  PlayerStore.__emitChange();
};

var setAdjustVolumeTo = function (volume) {
  _adjustVolumeTo = volume;

  PlayerStore.__emitChange();
};

var resetRequests = function () {
  _playRequested = false;
  _pauseRequested = false;
  _seekTo = null;
  _adjustVolumeTo = null;

  PlayerStore.__emitChange();
};

var resetTrackAndQueue = function (track) {
  _queue = [track];
  _queueIndex = 0;
  _track = _queue[_queueIndex];

  PlayerStore.__emitChange();
};

var loadNextTrackInQueue = function () {
  if (_queue.length <= 1) { return; }

  if (_queueIndex === _queue.length - 1) {
    _queueIndex = 0;
  } else {
    _queueIndex += 1;
  }

  _track = _queue[_queueIndex];

  PlayerStore.__emitChange();
};

var loadPreviousTrackInQueue = function () {
  if (_queue.length <= 1) { return; }

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
  if (isInQueue(track)) { return; }

  _queue.push(track);
  _track = _queue[_queueIndex];

  PlayerStore.__emitChange();
};

var isInQueue = function (track) {
  var index = _queue.findIndex(function (queuedTrack) {
    return (queuedTrack.id === track.id);
  });

  return (index !== -1);
};

var loadPlaylistToQueue = function (playlist) {
  _playlist = playlist;
  _queue = playlist.tracks;
  _queueIndex = 0;
  _track = _queue[_queueIndex];

  PlayerStore.__emitChange();
};

module.exports = PlayerStore;
