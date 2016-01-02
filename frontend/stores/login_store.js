var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _showModal = false;
var _errors = [];
var LoginStore = new Store(AppDispatcher);

LoginStore.__onDispatch = function (payload) {
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

LoginStore.showModal = function () {
  return _showModal;
};

LoginStore.getErrors = function () {
  return _errors.slice();
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  LoginStore.__emitChange();
};

module.exports = LoginStore;
