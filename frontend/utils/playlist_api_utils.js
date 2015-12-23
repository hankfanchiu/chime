var PlaylistAPIUtils = {
  fetchPlaylists: function (username, actionCallback) {
    var url = "/api/playlists"
    if (username) {
      url += "?username=" + username;
    }

    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  fetchPlaylist: function (username, playlistSlug, actionCallback) {
    var url = "/api/tracks/" + playlistSlug + "?username=" + username;

    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  createPlaylist: function (playlistData, actionCallback) {
    $.ajax({
      url: "/api/playlists",
      type: "POST",
      data: { playlist: playlistData },
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  updatePlaylist: function (playlistId, playlistData, actionCallback) {
    $.ajax({
      url: "/api/playlists/" + playlistId,
      type: "PATCH",
      data: { playlist: playlistData },
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  deletePlaylist: function (playlistId, actionCallback) {
    $.ajax({
      url: "/api/playlists/" + playlistId,
      type: "DELETE",
      success: function (response) {
        actionCallback(response);
      }
    });
  }
};

module.exports = PlaylistAPIUtils;
