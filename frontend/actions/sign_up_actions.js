var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var SignUpActions = {
  showModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SHOW_SIGN_UP_MODAL
    });
  },

  closeModal: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLOSE_SIGN_UP_MODAL
    });
  }
};

module.exports = SignUpActions;
