var UserAPIUtils = {
  fetchUser: function (username, callback) {
    $.ajax({
      url: "/api/users/" + username,
      type: "GET",
      success: callback
    });
  },

  createUser: function (userData, callback) {
    $.ajax({
      url: "/api/users",
      type: "POST",
      data: {user: userData},
      success: callback
    });
  },

  updateUser: function (userId, formData, callback) {
    $.ajax({
      url: "/api/users/" + userId,
      type: "PATCH",
      data: formData,
      processData: false,
      contentType: false,
      success: callback
    });
  },

  uploadImage: function (userId, formData, callback) {
    $.ajax({
      url: "/api/users/" + userId,
      type: "PUT",
      data: formData,
      processData: false,
      contentType: false,
      dataType: "json",
      success: callback
    });
  },

  deleteUser: function (userId, callback) {
    $.ajax({
      url: "/api/users/" + userId,
      type: "DELETE",
      success: callback
    });
  }
};

module.exports = UserAPIUtils;
