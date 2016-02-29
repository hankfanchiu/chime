module.exports = {
  fetchResults: function (queryString, callback) {
    var url = "/api/search?q=" + queryString;

    $.ajax({
      url: url,
      type: "GET",
      success: callback
    });
  }
};
