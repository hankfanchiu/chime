var TrackAPIUtils = {
  fetchTracks: function (userId, actionCallback) {
    var url = (userId ? "/api/tracks?user_id=" + userId : "/api/tracks");

    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  fetchTrack: function (trackTitle, actionCallback) {
    $.ajax({
      url: "/api/tracks/" + trackTitle,
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

  updateTrack: function (trackTitle, trackData, actionCallback) {
    $.ajax({
      url: "/api/tracks/" + trackTitle,
      type: "PATCH",
      data: {track: trackData},
      success: function (response) {
        actionCallback(response);
      }
    });
  },

  deleteTrack: function (trackTitle, actionCallback) {
    $.ajax({
      url: "/api/tracks/" + trackTitle,
      type: "DELETE",
      success: function (response) {
        actionCallback(response);
      }
    });
  }
};

module.exports = TrackAPIUtils;
