var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _queue = [];
var _queueIndex = 0;
var _track = {};

var PlayerStore = new Store(AppDispatcher);

PlayerStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var track = payload.track;
  var queue = payload.queue;

  switch (actionType) {

    case ActionTypes.PLAY_TRACK_NOW:
      resetTrack(track);
      break;

    case ActionTypes.ADD_TRACK_TO_QUEUE:
      addTrack(track);
      break;

    case ActionTypes.PLAY_NEXT_TRACK:
      playNextTrack();
      break;

    case ActionTypes.PLAY_QUEUE_RECEIVED:
      resetQueue(queue);
      break;
  };
};

PlayerStore.getTrack = function () {
  var trackCopy = jQuery.extend({}, _track);

  return trackCopy;
};

PlayerStore.getNextTrack = function () {
  var nextTrack = _queue[_queueIndex + 1];

  if (nextTrack === undefined) {
    return null;
  }

  var nextTrackCopy = jQuery.extend({}, nextTrack);

  return nextTrackCopy;
}

PlayerStore.queueIsEmpty = function () {
  return _queue.length === 0;
};

var resetTrack = function (track) {
  _queue = [track];
  _queueIndex = 0;
  _track = track;
  PlayerStore.__emitChange();
};

var addTrack = function (track) {
  _queue.push(track);
  PlayerStore.__emitChange();
};

var playNextTrack = function () {
  if (_queue.length === 0) {
    return;
  }

  if (_queueIndex === _queue.length) {
    _queueIndex = 0;
  }

  _track = _queue[_queueIndex];
  _queueIndex += 1;

  PlayerStore.__emitChange();
};

var resetQueue = function (queue) {
  _queue = queue;
  _track = _queue[0];

  PlayerStore.__emitChange();
};

module.exports = PlayerStore;
