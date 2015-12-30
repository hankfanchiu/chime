var TrackAPIUtils = {
  fetchTracks: function (username, callback) {
    var url = "/api/tracks";
    if (username) {
      url += "?username=" + username;
    }

    $.ajax({
      url: url,
      type: "GET",
      success: callback
    });
  },

  fetchTrack: function (username, trackSlug, callback) {
    var url = "/api/tracks/" + trackSlug + "?username=" + username;

    $.ajax({
      url: url,
      type: "GET",
      success: callback
    });
  },

  createTrack: function (formData, callback) {
    $.ajax({
      url: "/api/tracks",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: callback
    });
  },

  updateTrack: function (trackId, formData, callback) {
    $.ajax({
      url: "/api/tracks/" + trackId,
      type: "PATCH",
      data: formData,
      processData: false,
      contentType: false,
      success: callback
    });
  },

  deleteTrack: function (trackId, callback) {
    $.ajax({
      url: "/api/tracks/" + trackId,
      type: "DELETE",
      success: callback
    });
  }
};

module.exports = TrackAPIUtils;
