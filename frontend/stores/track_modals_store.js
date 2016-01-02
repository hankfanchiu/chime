var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showDeleteModal = false;
var _showEditModal = false;

var _trackDeleted = false;
var _updatedTrackPathname = null;

var _errors = [];

var TrackModalsStore = new Store(AppDispatcher);

TrackModalsStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  _trackDeleted = false;
  _updatedTrackPathname = null;
  _errors = [];

  switch (actionType) {

    // Modals
    case ActionTypes.SHOW_DELETE_TRACK_MODAL:
      setShowDeleteModal(true);
      break;

    case ActionTypes.CLOSE_DELETE_TRACK_MODAL:
      setShowDeleteModal(false);
      break;

    case ActionTypes.SHOW_EDIT_TRACK_MODAL:
      setShowEditModal(true);
      break;

    case ActionTypes.CLOSE_EDIT_TRACK_MODAL:
      setShowEditModal(false);
      break;

    // Responses
    case ActionTypes.TRACK_DELETED:
      if (response.errors) {
        recordErrors(response.errors);
      } else {
        recordTrackDeleted();
      }

      break;

    case ActionTypes.TRACK_UPDATED:
      if (response.errors) {
        recordErrors(response.errors);
      } else {
        recordTrackUpdated(response);
      }

      break;
  };
};

TrackModalsStore.showDeleteModal = function () {
  return _showDeleteModal;
};

TrackModalsStore.showEditModal = function () {
  return _showEditModal;
};

TrackModalsStore.getTrackDeleted = function () {
  return _trackDeleted;
};

TrackModalsStore.getUpdatedTrackPathname = function () {
  return _updatedTrackPathname;
};

TrackModalsStore.getErrors = function () {
  return _errors.slice();
};

var setShowDeleteModal = function (boolean) {
  _showDeleteModal = boolean;

  TrackModalsStore.__emitChange();
};

var setShowEditModal = function (boolean) {
  _showEditModal = boolean;

  TrackModalsStore.__emitChange();
};

var recordErrors = function (errors) {
  _errors = errors;

  TrackModalsStore.__emitChange();
};

var recordTrackDeleted = function () {
  _trackDeleted = true;
  _showDeleteModal = false;

  TrackModalsStore.__emitChange();
};

var recordTrackUpdated = function (response) {
  var updatedTrack = response.track;
  var newSlug = updatedTrack.slug;
  var username = updatedTrack.user.username;

  _updatedTrackPathname = "/" + username + "/" + newSlug;
  _showEditModal = false;

  TrackModalsStore.__emitChange();
};

module.exports = TrackModalsStore;
