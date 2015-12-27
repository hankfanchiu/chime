var SessionAPIUtils = {
  login: function (userData, callback) {
    $.ajax({
      url: "/api/session",
      type: "POST",
      data: {user: userData},
      success: callback
    });
  },

  logout: function (callback) {
    $.ajax({
      url: "/api/session",
      type: "DELETE",
      success: callback
    });
  },
};

module.exports = SessionAPIUtils;
