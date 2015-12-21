var SearchAPIUtils = {
  fetchResults: function (queryString, actionCallback) {
    var url = "/api/search?q=" + queryString;

    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        actionCallback(response);
      }
    });
  },
};

module.exports = SearchAPIUtils;
