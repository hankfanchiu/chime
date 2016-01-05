var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showModal = false;
var _isLoggingIn = false;
var _errors = [];
var LoginModalStore = new Store(AppDispatcher);

LoginModalStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  _errors = [];

  switch (actionType) {

    case ActionTypes.SHOW_LOGIN_MODAL:
      setShowModal(true);
      break;

    case ActionTypes.CLOSE_LOGIN_MODAL:
      setShowModal(false);
      break;

    case ActionTypes.LOGIN_INITIATED:
      setIsLoggingIn(true);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      _isLoggingIn = false;
      
      if (response.errors) {
        recordErrors(response.errors);
      } else {
        setShowModal(false);
      }
      break;
  };
};

LoginModalStore.getErrors = function () {
  return _errors.slice();
};

LoginModalStore.showModal = function () {
  return _showModal;
};

LoginModalStore.isLoggingIn = function () {
  return _isLoggingIn;
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  LoginModalStore.__emitChange();
};

var setIsLoggingIn = function (boolean) {
  _isLoggingIn = boolean;

  LoginModalStore.__emitChange();
};

var recordErrors = function (errors) {
  _errors = errors;

  LoginModalStore.__emitChange();
};

module.exports = LoginModalStore;
