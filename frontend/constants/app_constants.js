var keyMirror = require("keymirror");

module.exports = {

  ActionTypes: keyMirror({
    // Search
    SEARCH_RESULTS_RECEIVED: null,

    // Session
    LOGIN_RESPONSE: null,
    LOGOUT_RESPONSE: null,
    CLIENT_RECEIVED: null,

    // User
    USER_RECEIVED: null,
    USER_CREATED: null,
    USER_UPDATED: null,

    // Sign Up modal
    SHOW_SIGN_UP_MODAL: null,
    CLOSE_SIGN_UP_MODAL: null,

    // Login modal
    SHOW_LOGIN_MODAL: null,
    CLOSE_LOGIN_MODAL: null,

    // Settings modal
    SHOW_SETTINGS_MODAL: null,
    CLOSE_SETTINGS_MODAL: null,

    // Upload
    SHOW_UPLOAD_MODAL: null,
    PUBLIC_URL_RECEIVED: null,
    DIRECT_UPLOAD_PROGRESS_RECEIVED: null,
    DIRECT_UPLOAD_SUCCESS_RECEIVED: null,
    RESET_UPLOAD_STORE: null,

    // Discover
    DISCOVER_TRACKS_RECEIVED: null,

    // Track
    TRACKS_RECEIVED: null,
    TRACK_RECEIVED: null,
    TRACK_CREATED: null,
    TRACK_UPDATED: null,
    TRACK_DELETED: null,

    // Edit track modal
    SHOW_EDIT_TRACK_MODAL: null,
    CLOSE_EDIT_TRACK_MODAL: null,

    // Delete track modal
    SHOW_DELETE_TRACK_MODAL: null,
    CLOSE_DELETE_TRACK_MODAL: null,

    // Playlist
    PLAYLISTS_RECEIVED: null,
    PLAYLIST_RECEIVED: null,
    PLAYLIST_CREATED: null,
    PLAYLIST_UPDATED: null,
    PLAYLIST_DELETED: null,

    // New playlist modal
    SHOW_PLAYLIST_MODAL: null,
    CLOSE_PLAYLIST_MODAL: null,

    // Playlisting
    PLAYLISTING_CREATED: null,
    PLAYLISTING_DELETED: null,

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

    // Audio
    AUDIO_SET_TO_PLAYING: null,
    AUDIO_SET_TO_PAUSED: null,
    AUDIO_SET_TO_ENDED: null,
    AUDIO_CURRENT_TIME_RECEIVED: null,
    AUDIO_VOLUME_RECEIVED: null,
    AUDIO_DURATION_RECEIVED: null
  })

};
