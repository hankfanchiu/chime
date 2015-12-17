var keyMirror = require("keymirror");

module.exports = {

  ActionTypes: keyMirror({
    // Session
    LOGIN_RESPONSE: null,
    LOGOUT_RESPONSE: null,

    // User
    USER_RECEIVED: null,

    // Tracks
    TRACKS_RECEIVED: null,

    // Playback (player)
    PLAYBACK_TRACK_RECEIVED: null
  })

};
