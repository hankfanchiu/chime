var UserAPIUtils = {
  fetchUser: function (userId, actionCallback) {
    $.ajax({
      url: "/api/users/" + userId,
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

  updateUser: function (userId, userData, actionCallback) {
    $.ajax({
      url: "/api/users/" + userId,
      type: "PATCH",
      data: { user: userData },
      success: function (user) {
        actionCallback(user);
      }
    });
  },

  uploadImage: function (userId, file, actionCallback) {
    var formData = new FormData();
    formData.append("user[avatar]", file);

    $.ajax({
      url: "/api/users/" + userId,
      type: "PUT",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: function (user) {
        debugger;
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
