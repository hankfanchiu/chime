var Store = require("flux/utils").Store;
var AppDispatcher = require("../dispatcher/dispatcher");
var ActionTypes = require("../constants/app_constants").ActionTypes;

var _userMatches = [];
var _trackMatches = [];
var SearchStore = new Store(AppDispatcher);

SearchStore.__onDispatch = function (payload) {
  var actionType = payload.actionType;
  var response = payload.response;

  switch (actionType) {

    case ActionTypes.SEARCH_RESULTS_RECEIVED:
      resetSearchResults(response);
      break;

    case ActionTypes.CLEAR_SEARCH_RESULTS:
      clearSearchResults();
      break;
  };
};

SearchStore.getUserResults = function () {
  return _userMatches.slice();
};

SearchStore.getTrackResults = function () {
  return _trackMatches.slice();
};

var resetSearchResults = function (response) {
  _userMatches = response.users;
  _trackMatches = response.tracks;

  SearchStore.__emitChange();
};

var clearSearchResults = function () {
  _userMatches = [];
  _trackMatches = [];

  SearchStore.__emitChange();
};

module.exports = SearchStore;
