var keyMirror = require("keymirror");

module.exports = {

  ActionTypes: keyMirror({
    // Search
    SEARCH_RESULTS_RECEIVED: null,

    // Session
    LOGIN_RESPONSE: null,
    LOGOUT_RESPONSE: null,
    CURRENT_USER_RECEIVED: null,

    // User
    USER_RECEIVED: null,

    // Track
    TRACKS_RECEIVED: null,
    TRACK_RECEIVED: null,
    NEW_TRACK_RECEIVED: null,

    // Playlist
    PLAYLISTS_RECEIVED: null,
    PLAYLIST_RECEIVED: null,

    // Playlisting
    PLAYLISTING_RECEIVED: null,

    // Player
    PLAY_AUDIO: null,
    PAUSE_AUDIO: null,
    SEEK_TO: null,
    ADJUST_VOLUME_TO: null,

    PLAY_TRACK_NOW: null,
    PLAY_NEXT_TRACK: null,
    PLAY_PREVIOUS_TRACK: null,
    AUTO_PLAY_TRACK: null,
    ADD_TRACK_TO_QUEUE: null,
    LOAD_PLAYLIST: null,

    // Upload
    PUBLIC_URL_RECEIVED: null,
    DIRECT_UPLOAD_RESPONSE_RECEIVED: null,
    RESET_UPLOAD_STORE: null
  })

};
