module.exports = {
  createPlaylisting: function (playlistingData, callback) {
    $.ajax({
      url: "/api/playlistings",
      type: "POST",
      data: {playlisting: playlistingData},
      success: callback
    });
  },

  deletePlaylisting: function (ids, callback) {
    $.ajax({
      url: "/api/remove_track_from_playlist",
      type: "POST",
      data: {playlisting: ids},
      success: callback
    });
  }
};
