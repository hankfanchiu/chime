var WebAPIUtils = {
  signUp: function (userData, actionCallback) {
    $.ajax({
      url: "/users",
      type: "POST",
      data: {user: userData},
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  login: function (userData, actionCallback) {
    $.post("/session", {user: userData}, function (response) {
      actionCallback(response);
    });
  },

  logout: function (actionCallback) {
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function (response) {
        actionCallback(response);
      }
    });
  }
};

module.exports = WebAPIUtils;
