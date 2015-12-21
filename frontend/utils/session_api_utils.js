var SessionAPIUtils = {
  login: function (userData, actionCallback) {
    $.ajax({
      url: "/api/session",
      type: "POST",
      data: {user: userData},
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  logout: function (actionCallback) {
    $.ajax({
      url: "/api/session",
      type: "DELETE",
      success: function (response) {
        actionCallback(response);
      }
    });
  },
};

module.exports = SessionAPIUtils;
