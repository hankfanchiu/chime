var WebAPIUtils = {
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
