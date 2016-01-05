var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showModal = false;
var _isSaving = false;
var _errors = [];
var SettingsModalStore = new Store(AppDispatcher);

SettingsModalStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  _errors = [];

  switch (actionType) {

    case ActionTypes.SHOW_SETTINGS_MODAL:
      setShowModal(true);
      break;

    case ActionTypes.CLOSE_SETTINGS_MODAL:
      setShowModal(false);
      break;

    case ActionTypes.SAVE_SETTINGS_INITIATED:
      setIsSaving();
      break;

    case ActionTypes.USER_UPDATED:
      _isSaving = false;

      if (response.errors) {
        recordErrors(response.errors);
      } else {
        setShowModal(false);
      }

      break;
  };
};

SettingsModalStore.getErrors = function () {
  return _errors.slice();
};

SettingsModalStore.isSaving = function () {
  return _isSaving;
};

SettingsModalStore.showModal = function () {
  return _showModal;
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  SettingsModalStore.__emitChange();
};

var setIsSaving = function () {
  _isSaving = true;

  SettingsModalStore.__emitChange();
};

var recordErrors = function (errors) {
  _errors = errors;

  SettingsModalStore.__emitChange();
};

module.exports = SettingsModalStore;
