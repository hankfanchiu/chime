var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _showModal = false;
var SignUpStore = new Store(AppDispatcher);

SignUpStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.SHOW_SIGN_UP_MODAL:
      setShowModal(true);
      break;

    case ActionTypes.CLOSE_SIGN_UP_MODAL:
      setShowModal(false);
      break;

    case ActionTypes.SIGN_UP_RESPONSE:
      if (!response.errors) { setShowModal(false); }
      break;

  };
};

SignUpStore.showModal = function () {
  return _showModal;
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  SignUpStore.__emitChange();
};

module.exports = SignUpStore;
