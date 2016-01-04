var SearchAPIUtils = require("../utils/search_api_utils");
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var SearchActions = {
  // Clear Search Store

  clearResults: function () {
    AppDispatcher.dispatch({
      actionType: ActionTypes.CLEAR_SEARCH_RESULTS
    });
  },

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
