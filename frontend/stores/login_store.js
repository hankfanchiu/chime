var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _showModal = false;
var LoginStore = new Store(AppDispatcher);

LoginStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.SHOW_LOGIN_MODAL:
      setShowModal(true);
      break;

    case ActionTypes.CLOSE_LOGIN_MODAL:
      setShowModal(false);
      break;

    case ActionTypes.LOGIN_RESPONSE:
      if (!response.errors) { setShowModal(false); }
      break;

  };
};

LoginStore.showModal = function () {
  return _showModal;
};

var setShowModal = function (boolean) {
  _showModal = boolean;

  LoginStore.__emitChange();
};

module.exports = LoginStore;
