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
      data: { user: userData },
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  updateUser: function (userId, formData, actionCallback) {
    $.ajax({
      url: "/api/users/" + userId,
      type: "PATCH",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  uploadImage: function (userId, formData, actionCallback) {
    $.ajax({
      url: "/api/users/" + userId,
      type: "PUT",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
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
