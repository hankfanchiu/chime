var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var isPlaying = false;
var isPaused = false;
var isEnded = false;
var currentTime = null;
var volume = null;
var duration = null;

var AudioStore = new Store(AppDispatcher);

AudioStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.PLAY_AUDIO:
      playAudio();
      break;

    case ActionTypes.PAUSE_AUDIO:
      pauseAudio();
      break;

    case ActionTypes.SEEK_TO:
      seekTo()
      break;

    case ActionTypes.ADJUST_VOLUME_TO:

      break;

    case ActionTypes.SET_TO_IS_PLAYING:

      break;

    case ActionTypes.SET_TO_IS_PAUSED:

      break;

    case ActionTypes.SET_TO_IS_ENDED:

      break;

    case ActionTypes.SET_CURRENT_TIME:

      break;

    case ActionTypes.SET_VOLUME:

      break;

    case ActionTypes.SET_DURATION:

      break;
  };
};

AudioStore.getTrack = function () {
  var trackCopy = jQuery.extend({}, _track);

  return trackCopy;
};

AudioStore.getNextTrack = function () {
  var nextTrack = _queue[_queueIndex + 1];
  var nextTrackCopy;

  if (nextTrack === undefined) { return null; }

  nextTrackCopy = jQuery.extend({}, nextTrack);

  return nextTrackCopy;
}

AudioStore.queueIsEmpty = function () {
  return (_queue.length === 0);
};

AudioStore.queueIsEnded = function () {
  return (_queueIndex === _queue.length - 1);
};

AudioStore.isInQueue = function (track) {
  return (_queue.indexOf(track) !== -1);
};

var resetTrackAndQueue = function (track) {
  _queue = [track];
  _queueIndex = 0;
  _track = track;

  AudioStore.__emitChange();
};

var loadNextTrackInQueue = function () {
  if ((_queue.length === 0) || (_queue.length === 1)) { return; }

  if (_queueIndex === _queue.length - 1) {
    _queueIndex = 0;
  } else {
    _queueIndex += 1;
  }

  _track = _queue[_queueIndex];

  AudioStore.__emitChange();
};

var loadPreviousTrackInQueue = function () {
  if ((_queue.length === 0) || (_queue.length === 1)) { return; }

  if (_queueIndex === 0) {
    _queueIndex = _queue.length - 1;
  } else {
    _queueIndex -= 1;
  }

  _track = _queue[_queueIndex];

  AudioStore.__emitChange();
};

var loadNextTrackUntilEnd = function () {
  if (_queue.length === 0) { return; }
  if (_queueIndex === _queue.length - 1) { return; }

  _queueIndex += 1;

  _track = _queue[_queueIndex];

  AudioStore.__emitChange();
};

var pushTrackToQueue = function (track) {
  if (!AudioStore.isInQueue(track)) { _queue.push(track); }

  AudioStore.__emitChange();
};

var loadPlaylistToQueue = function (playlist) {
  _playlist = playlist;
  _queue = playlist.tracks;
  _queueIndex = 0;
  _track = _queue[_queueIndex];

  AudioStore.__emitChange();
};

module.exports = AudioStore;
