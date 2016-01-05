var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showModal = false;
var _isSaving = false;
var _publicUrl = null;
var _progress = 0;
var _responseStatus = null;
var _newTrackPathname = null;
var _errors = [];
var UploadStore = new Store(AppDispatcher);

UploadStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  _newTrackPathname = null;
  _errors = [];

  switch (actionType) {

    case ActionTypes.SHOW_UPLOAD_MODAL:
      setShowModal(true);
      break;

    case ActionTypes.CLOSE_UPLOAD_MODAL:
      resetUploadStore();
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

    case ActionTypes.CREATE_TRACK_INITIATED:
      setIsSaving();
      break;

    case ActionTypes.TRACK_CREATED:
      _isSaving = false;

      if (response.errors) {
        recordErrors(response.errors);
      } else {
        recordTrackCreated(response);
      }

      break;

  };
};

UploadStore.getErrors = function () {
  return _errors.slice();
};

UploadStore.isSaving = function () {
  return _isSaving;
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
  return (_responseStatus === 200);
};

UploadStore.getTrackPathname = function () {
  return _newTrackPathname;
};

var setShowModal = function (boolean) {
  _showModal = boolean;

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

var setIsSaving = function () {
  _isSaving = true;

  UploadStore.__emitChange();
};

var recordErrors = function (errors) {
  _errors = errors;

  UploadStore.__emitChange();
};

var recordTrackCreated = function (response) {
  var track = response.track;
  var pathname = "/" + track.user.username + "/" + track.slug;

  _newTrackPathname = pathname;
  _showModal = false;
  _publicUrl = null;
  _progress = 0;
  _responseStatus = null;

  UploadStore.__emitChange();
}

var resetUploadStore = function () {
  _showModal = false;
  _publicUrl = null;
  _progress = 0;
  _responseStatus = null;

  UploadStore.__emitChange();
};

module.exports = UploadStore;
