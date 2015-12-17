var UserAPIUtils = {
  fetchUser: function (userId, actionCallback) {
    $.ajax({
      url: "/users/" + userId,
      type: "GET",
      success: function (user) {
        actionCallback(user);
      }
    })
  },

  updateUser: function (userId, userData, actionCallback) {
    $.ajax({
      url: "/users/" + userId,
      type: "PATCH",
      data: {user: userData},
      success: function (user) {
        actionCallback(user);
      }
    })
  }
};

module.exports = UserAPIUtils;
