var keyMirror = require("keymirror");

module.exports = {

  ActionTypes: keyMirror({
    // Search
    SEARCH_RESULTS_RECEIVED: null,
    CLEAR_SEARCH_RESULTS: null,

    // Sign Up modal
    SHOW_SIGN_UP_MODAL: null,
    CLOSE_SIGN_UP_MODAL: null,
    SIGN_UP_INITIATED: null,

    // Login modal
    SHOW_LOGIN_MODAL: null,
    CLOSE_LOGIN_MODAL: null,
    LOGIN_INITIATED: null,

    // Settings modal
    SHOW_SETTINGS_MODAL: null,
    CLOSE_SETTINGS_MODAL: null,
    SAVE_SETTINGS_INITIATED: null,

    // Session
    LOGIN_RESPONSE: null,
    LOGOUT_RESPONSE: null,
    CLIENT_RECEIVED: null,

    // User
    USER_RECEIVED: null,
    USER_CREATED: null,
    USER_UPDATED: null,
    UPLOAD_AVATAR_INITIATED: null,

    // Track
    TRACKS_RECEIVED: null,
    TRACK_RECEIVED: null,
    TRACK_CREATED: null,
    TRACK_UPDATED: null,
    TRACK_DELETED: null,

    // Upload
    SHOW_UPLOAD_MODAL: null,
    CLOSE_UPLOAD_MODAL: null,
    PUBLIC_URL_RECEIVED: null,
    DIRECT_UPLOAD_PROGRESS_RECEIVED: null,
    DIRECT_UPLOAD_SUCCESS_RECEIVED: null,
    CREATE_TRACK_INITIATED: null,

    // Delete track modal
    SHOW_DELETE_TRACK_MODAL: null,
    CLOSE_DELETE_TRACK_MODAL: null,
    DELETE_TRACK_INITIATED: null,

    // Edit track modal
    SHOW_EDIT_TRACK_MODAL: null,
    CLOSE_EDIT_TRACK_MODAL: null,
    UPDATE_TRACK_INITIATED: null,

    // Discover
    DISCOVER_TRACKS_RECEIVED: null,

    // Playlist
    PLAYLISTS_RECEIVED: null,
    PLAYLIST_RECEIVED: null,
    PLAYLIST_CREATED: null,
    PLAYLIST_UPDATED: null,
    PLAYLIST_DELETED: null,

    // Create playlist modal
    SHOW_CREATE_PLAYLIST_MODAL: null,
    CLOSE_CREATE_PLAYLIST_MODAL: null,
    CREATE_PLAYLIST_INITIATED: null,

    // Delete playlist modal
    SHOW_DELETE_PLAYLIST_MODAL: null,
    CLOSE_DELETE_PLAYLIST_MODAL: null,
    DELETE_PLAYLIST_INITIATED: null,

    // Edit playlist modal
    SHOW_EDIT_PLAYLIST_MODAL: null,
    CLOSE_EDIT_PLAYLIST_MODAL: null,
    UPDATE_PLAYLIST_INITIATED: null,

    // Playlisting
    PLAYLISTING_CREATED: null,
    PLAYLISTING_DELETED: null,

    // Player
    PLAY_AUDIO: null,
    PAUSE_AUDIO: null,
    SEEK_TO: null,
    ADJUST_VOLUME_TO: null,
    RESET_PLAYER_REQUESTS: null,

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
