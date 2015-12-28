var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _showModal = false;
var _publicUrl = null;
var _progress = 0;
var _responseStatus = null;
var _newTrackPathname = null;
var UploadStore = new Store(AppDispatcher);

UploadStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.SHOW_UPLOAD_MODAL:
      setShowModal();
      break;

    case ActionTypes.PUBLIC_URL_RECEIVED:
      setPublicUrl(response);
      break;

    case ActionTypes.DIRECT_UPLOAD_PROGRESS_RECEIVED:
      updateProgress(response);
      break;

    case ActionTypes.DIRECT_UPLOAD_SUCCESS_RECEIVED:
      setResponseStatus(response);
      break;

    case ActionTypes.TRACK_CREATED:
      if (!response.errors) { setTrackPathname(response); }
      break;

    case ActionTypes.RESET_UPLOAD_STORE:
      resetUploadStore();
      break;

  };
};

UploadStore.showModal = function () {
  return _showModal;
};

UploadStore.getPublicUrl = function () {
  return _publicUrl;
};

UploadStore.getProgress = function () {
  return _progress;
};

UploadStore.isUploaded = function () {
  return _responseStatus === 200;
};

UploadStore.getTrackPathname = function () {
  return _newTrackPathname;
};

var setShowModal = function () {
  _showModal = true;

  UploadStore.__emitChange();
};

var setPublicUrl = function (response) {
  _publicUrl = response.public_url;
  _responseStatus = null;

  UploadStore.__emitChange();
};

var updateProgress = function (percent) {
  _progress = parseFloat(percent) * 100;

  UploadStore.__emitChange();
};

var setResponseStatus = function (response) {
  _responseStatus = response.status;

  UploadStore.__emitChange();
};

var setTrackPathname = function (track) {
  _showModal = false;
  _publicUrl = null;
  _progress = 0;
  _responseStatus = null;
  _newTrackPathname = "/" + track.user.username + "/" + track.slug;

  UploadStore.__emitChange();
};

var resetUploadStore = function () {
  _showModal = false;
  _publicUrl = null;
  _progress = 0;
  _responseStatus = null;
  _newTrackPathname = null;

  UploadStore.__emitChange();
};

module.exports = UploadStore;
