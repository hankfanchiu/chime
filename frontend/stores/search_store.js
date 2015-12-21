var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var AppConstants = require("../constants/app_constants");
var ActionTypes = AppConstants.ActionTypes;

var _searchResults = [];

var SearchStore = new Store(AppDispatcher);

SearchStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.SEARCH_RESULTS_RECEIVED
      resetSearchResults(response)
      break;
  }
};

SearchStore.success = function () {
  return _searchResults.slice();
};

SearchStore.errors = function () {
  return _errors.slice();
};

module.exports = SearchStore;
