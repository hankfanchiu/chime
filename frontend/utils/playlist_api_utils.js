var PlaylistAPIUtils = {
  fetchPlaylists: function (userId, actionCallback) {
    var url = (userId ? "/api/playlists?user_id=" + userId : "/api/playlists");

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
