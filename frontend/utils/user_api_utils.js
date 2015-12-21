var UserAPIUtils = {
  fetchUser: function (username, actionCallback) {
    $.ajax({
      url: "/api/users/" + username,
      type: "GET",
      success: function (user) {
        actionCallback(user);
      }
    });
  },

  createUser: function (userData, actionCallback) {
    $.ajax({
      url: "/api/users",
      type: "POST",
      data: {user: userData},
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  updateUser: function (userId, userData, actionCallback) {
    $.ajax({
      url: "/api/users/" + userId,
      type: "PATCH",
      data: {user: userData},
      success: function (user) {
        actionCallback(user);
      }
    });
  },

  deleteUser: function (userId, actionCallback) {
    $.ajax({
      url: "/api/users/" + userId,
      type: "DELETE",
      success: function (user) {
        actionCallback(user);
      }
    });
  }
};

module.exports = UserAPIUtils;
