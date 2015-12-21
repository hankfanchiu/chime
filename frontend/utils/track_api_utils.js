var TrackAPIUtils = {
  fetchTracks: function (user, actionCallback) {
    var url = (user ? "/api/tracks?user_id=" + user : "/api/tracks");

    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  fetchTrack: function (slug, actionCallback) {
    $.ajax({
      url: "/api/tracks/" + slug,
      type: "GET",
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  createTrack: function (trackData, actionCallback) {
    $.ajax({
      url: "/api/tracks",
      type: "POST",
      data: {track: trackData},
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  updateTrack: function (slug, trackData, actionCallback) {
    $.ajax({
      url: "/api/tracks/" + slug,
      type: "PATCH",
      data: {track: trackData},
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  deleteTrack: function (slug, actionCallback) {
    $.ajax({
      url: "/api/tracks/" + slug,
      type: "DELETE",
      success: function (response) {
        actionCallback(response);
      }
    });
  }
};

module.exports = TrackAPIUtils;
