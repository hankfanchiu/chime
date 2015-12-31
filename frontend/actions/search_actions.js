var SearchAPIUtils = require("../utils/search_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var SearchActions = {
  // Request actions

  fetchResults: function (query) {
    if (query === "") { return; }

    SearchAPIUtils.fetchResults(query, SearchActions.receiveResults);
  },

  // Response actions

  receiveResults: function (response) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.SEARCH_RESULTS_RECEIVED,
      response: response
    });
  }
};

module.exports = SearchActions;
