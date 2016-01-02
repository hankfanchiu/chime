var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showModal = false;
var _errors = [];
var SignUpModalStore = new Store(AppDispatcher);

SignUpModalStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  _errors = [];

  switch (actionType) {

    case ActionTypes.SHOW_SIGN_UP_MODAL:
      setShowModal(true);
      break;

    case ActionTypes.CLOSE_SIGN_UP_MODAL:
      setShowModal(false);
      break;

    case ActionTypes.USER_CREATED:
      _errors = response.errors || [];
      setShowModal(!!response.errors);
      break;
  };
};

SignUpModalStore.showModal = function () {
  return _showModal;
};

SignUpModalStore.getErrors = function () {
  return _errors.slice();
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  SignUpModalStore.__emitChange();
};

module.exports = SignUpModalStore;
