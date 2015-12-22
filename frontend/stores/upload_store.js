var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _publicUrl = null;
var _responseStatus = null;
var UploadStore = new Store(AppDispatcher);

UploadStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.PUBLIC_URL_RECEIVED:
      resetPublicUrl(response);
      break;

    case ActionTypes.DIRECT_UPLOAD_RESPONSE_RECEIVED:
      resetResponseStatus(response);
      break;

  };
};

UploadStore.getPublicUrl = function () {
  return _publicUrl;
};

UploadStore.isUploaded = function () {
  return _responseStatus === 200;
};

var resetPublicUrl = function (response) {
  _publicUrl = response.public_url;
  _responseStatus = null;

  UploadStore.__emitChange();
};

var resetResponseStatus = function (response) {
  _responseStatus = response.status;

  UploadStore.__emitChange();
};

module.exports = UploadStore;
