var SearchAPIUtils = {
  fetchResults: function (queryString, callback) {
    var url = "/api/search?q=" + queryString;

    $.ajax({
      url: url,
      type: "GET",
      success: callback
    });
  },
};

module.exports = SearchAPIUtils;
