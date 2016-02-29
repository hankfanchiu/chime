module.exports = {
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
      dataType: "json",
      success: callback
    });
  }
};
