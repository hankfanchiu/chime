var PlaylistAPIUtils = {
  fetchPlaylists: function (userId, actionCallback) {
    var url = "/api/playlists";

    if (userId) {
      url = url + "?user_id=" + userId;
    }

    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  fetchPlaylist: function (playlistId, actionCallback) {
    $.ajax({
      url: "/api/playlists/" + playlistId,
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
      data: {playlist: playlistData}
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  updatePlaylist: function (playlistId, playlistData, actionCallback) {
    $.ajax({
      url: "/api/playlists/" + playlistId,
      type: "PATCH",
      data: {playlist: playlistData}
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
