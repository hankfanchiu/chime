var TrackAPIUtils = {
  fetchTracks: function (actionCallback) {
    $.ajax({
      url: "/api/tracks",
      type: "GET",
      success: function (tracks) {
        actionCallback(tracks);
      }
    });
  }
};

module.exports = TrackAPIUtils;
