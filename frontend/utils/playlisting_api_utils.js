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
  }
};

module.exports = PlaylistingAPIUtils;
