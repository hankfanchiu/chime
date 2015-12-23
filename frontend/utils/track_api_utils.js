var TrackAPIUtils = {
  fetchTracks: function (username, actionCallback) {
    var url = "/api/tracks";
    if (username) {
      url += "?username=" + username;
    }

    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  fetchTrack: function (username, trackSlug, actionCallback) {
    var url = "/api/tracks/" + trackSlug + "?username=" + username;

    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  createTrack: function (formData, actionCallback) {
    $.ajax({
      url: "/api/tracks",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  updateTrack: function (trackId, trackData, actionCallback) {
    $.ajax({
      url: "/api/tracks/" + trackId,
      type: "PATCH",
      data: { track: trackData },
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  deleteTrack: function (trackId, actionCallback) {
    $.ajax({
      url: "/api/tracks/" + trackId,
      type: "DELETE",
      success: function (response) {
        actionCallback(response);
      }
    });
  }
};

module.exports = TrackAPIUtils;
