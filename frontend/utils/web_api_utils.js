var WebAPIUtils = {
  fetchPlaylists: function (actionCallback) {
    $.ajax({
      url: "/profile/fetch_playlists",
      type: "GET",
      success: function (playlists) {
        actionCallback(playlists);
      }
    });
  }
};

module.exports = WebAPIUtils;
