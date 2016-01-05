var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showModal = false;
var _isSigningUp = false;
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

    case ActionTypes.SIGN_UP_INITIATED:
      setIsSigningUp();
      break;

    case ActionTypes.USER_CREATED:
      _isSigningUp = false;

      if (response.errors) {
        recordErrors(response.errors);
      } else {
        setShowModal(false);
      }

      break;
  };
};

SignUpModalStore.getErrors = function () {
  return _errors.slice();
};

SignUpModalStore.showModal = function () {
  return _showModal;
};

SignUpModalStore.isSigningUp = function () {
  return _isSigningUp;
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  SignUpModalStore.__emitChange();
};

var setIsSigningUp = function () {
  _isSigningUp = true;

  SignUpModalStore.__emitChange();
};

var recordErrors = function (errors) {
  _errors = errors;

  SignUpModalStore.__emitChange();
};

module.exports = SignUpModalStore;
