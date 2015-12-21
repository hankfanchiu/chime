var keyMirror = require("keymirror");

module.exports = {

  ActionTypes: keyMirror({
    // Session
    LOGIN_RESPONSE: null,
    LOGOUT_RESPONSE: null,
    CURRENT_USER_RECEIVED: null,

    // User
    USER_RECEIVED: null,

    // Track
    TRACKS_RECEIVED: null,
    TRACK_RECEIVED: null,

    // Playlist
    PLAYLISTS_RECEIVED: null,

    // Playlisting
    PLAYLISTING_RECEIVED: null,

    // Player
    PLAY_TRACK_NOW: null,
    PLAY_NEXT_TRACK: null,
    PLAY_PREVIOUS_TRACK: null,
    AUTO_PLAY_TRACK: null,
    ADD_TRACK_TO_QUEUE: null,
    LOAD_PLAYLIST: null
  })

};
