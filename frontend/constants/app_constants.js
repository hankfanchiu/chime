var keyMirror = require("keymirror");

module.exports = {

  ActionTypes: keyMirror({
    // Session
    LOGIN_RESPONSE: null,
    LOGOUT_RESPONSE: null,

    // Tracks
    TRACKS_RECEIVED: null
  })

};
