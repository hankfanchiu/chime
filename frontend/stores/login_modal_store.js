var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showModal = false;
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

    case ActionTypes.LOGIN_RESPONSE:
      _errors = response.errors || [];
      setShowModal(!!response.errors);
      break;
  };
};

LoginModalStore.showModal = function () {
  return _showModal;
};

LoginModalStore.getErrors = function () {
  return _errors.slice();
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  LoginModalStore.__emitChange();
};

module.exports = LoginModalStore;
