var WebAPIUtils = {
  fetchProfile: function (actionCallback) {
    $.ajax({
      url: "/profile/fetch",
      type: "GET",
      success: function (user) {
        actionCallback(user);
      }
    })
  },

  updateProfile: function (userData, actionCallback) {
    $.ajax({
      url: "/profile/update",
      type: "PATCH",
      data: {user: userData},
      success: function (user) {
        actionCallback(user);
      }
    })
  },

  fetchTracks: function (actionCallback) {
    $.ajax({
      url: "/api/tracks",
      type: "GET",
      success: function (tracks) {
        actionCallback(tracks);
      }
    })
  },

  fetchPlaylists: function (actionCallback) {
    $.ajax({
      url: "/profile/fetch_playlists",
      type: "GET",
      success: function (playlists) {
        actionCallback(playlists);
      }
    })
  }
};

module.exports = WebAPIUtils;
