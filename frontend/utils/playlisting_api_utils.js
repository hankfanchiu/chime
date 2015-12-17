var PlaylistingAPIUtils = {
  createPlaylisting: function (playlistingData, actionCallback) {
    $.ajax({
      url: "/api/playlistings",
      type: "POST",
      data: {playlisting: playlistingData},
      success: function (playlisting) {
        actionCallback(playlisting);
      }
    });
  },

  deletePlaylisting: function (playlistId, trackId, actionCallback) {
    var query = "?playlist_id=" + playlistId + "&track_id=" + trackId;

    $.ajax({
      url: "/api/playlistings" + query,
      type: "DELETE",
      success: function (playlisting) {
        actionCallback(playlisting);
      }
    });
  }
};

module.exports = PlaylistingAPIUtils;
