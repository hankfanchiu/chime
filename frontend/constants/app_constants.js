var keyMirror = require("keymirror");

module.exports = {

  ActionTypes: keyMirror({
    // Session
    LOGIN_RESPONSE: null,
    LOGOUT_RESPONSE: null,

    // User
    USER_RECEIVED: null,

    // Track
    TRACKS_RECEIVED: null,

    // Playlist
    PLAYLISTS_RECEIVED: null,

    // Playlisting
    PLAYLISTING_RECEIVED: null,

    // Player
    PLAY_TRACK_NOW: null,
    ADD_TRACK_TO_QUEUE: null,
    PLAY_NEXT_TRACK: null,
    LOAD_PLAYLIST: null
  })

};
