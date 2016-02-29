module.exports = {
  fetchPlaylists: function (username, callback) {
    var url = "/api/playlists"
    if (username) {
      url += "?username=" + username;
    }

    $.ajax({
      url: url,
      type: "GET",
      success: callback
    });
  },

  fetchPlaylist: function (username, playlistSlug, callback) {
    var url = "/api/playlists/" + playlistSlug + "?username=" + username;

    $.ajax({
      url: url,
      type: "GET",
      success: callback
    });
  },

  createPlaylist: function (playlistData, callback) {
    $.ajax({
      url: "/api/playlists",
      type: "POST",
      data: { playlist: playlistData },
      success: callback
    });
  },

  updatePlaylist: function (playlistId, playlistData, callback) {
    $.ajax({
      url: "/api/playlists/" + playlistId,
      type: "PATCH",
      data: { playlist: playlistData },
      success: callback
    });
  },

  deletePlaylist: function (playlistId, callback) {
    $.ajax({
      url: "/api/playlists/" + playlistId,
      type: "DELETE",
      success: callback
    });
  }
};
