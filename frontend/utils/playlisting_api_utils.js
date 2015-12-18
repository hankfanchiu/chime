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

  deletePlaylisting: function (ids, actionCallback) {
    $.ajax({
      url: "/api/remove_track_from_playlist",
      type: "POST",
      data: { playlisting: ids },
      success: function (playlisting) {
        actionCallback(playlisting);
      }
    });
  }
};

module.exports = PlaylistingAPIUtils;
