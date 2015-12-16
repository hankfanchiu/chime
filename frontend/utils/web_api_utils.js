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
    $.ajax({
      url: "/session",
      type: "POST",
      data: {user: userData},
      success: function (response) {
        actionCallback(response);
      }
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
  },

  fetchTracks: function (actionCallback) {
    $.ajax({
      url: "/api/tracks",
      type: "GET",
      success: function (tracks) {
        actionCallback(tracks);
      }
    })
  }
};

module.exports = WebAPIUtils;
