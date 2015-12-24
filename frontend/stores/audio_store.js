var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _isPlaying = false;
var _isPaused = false;
var _isEnded = false;
var _currentTime = null;
var _volume = null;
var _duration = null;

var AudioStore = new Store(AppDispatcher);

AudioStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.AUDIO_SET_TO_PLAYING:
      setIsPlaying();
      break;

    case ActionTypes.AUDIO_SET_TO_PAUSED:
      setIsPaused();
      break;

    case ActionTypes.AUDIO_SET_TO_ENDED:
      setIsEnded()
      break;

    case ActionTypes.AUDIO_CURRENT_TIME_RECEIVED:
      setCurrentTime(response);
      break;

    case ActionTypes.AUDIO_VOLUME_RECEIVED:
      setVolume(response);
      break;

    case ActionTypes.AUDIO_DURATION_RECEIVED:
      setDuration(response);
      break;

  };
};

AudioStore.isPlaying = function () {
  return _isPlaying;
};

AudioStore.isPaused = function () {
  return _isPaused;
};

AudioStore.isEnded = function () {
  return _isEnded;
};

AudioStore.getCurrentTime = function () {
  return _currentTime;
};

AudioStore.getVolume = function () {
  return _volume;
};

AudioStore.getDuration = function () {
  return _duration;
};

var setIsPlaying = function () {
  _isPlaying = true;
  _isPaused = false;
  _isEnded = false;

  AudioStore.__emitChange();
};

var setIsPaused = function () {
  _isPlaying = false;
  _isPaused = true;
  _isEnded = false;

  AudioStore.__emitChange();
};

var setIsEnded = function () {
  _isPlaying = false;
  _isPaused = false;
  _isEnded = true;

  AudioStore.__emitChange();
};

var setCurrentTime = function (time) {
  _currentTime = time;

  AudioStore.__emitChange();
};

var setVolume = function (volume) {
  _volume = volume;

  AudioStore.__emitChange();
};

var setDuration = function (duration) {
  _duration = duration;

  AudioStore.__emitChange();
};

module.exports = AudioStore;
