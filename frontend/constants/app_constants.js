var keyMirror = require("keymirror");

module.exports = {

  ActionTypes: keyMirror({
    // Session
    SIGNUP_REQUEST: null,
    SIGNUP_RESPONSE: null,

    LOGIN_REQUEST: null,
    LOGIN_RESPONSE: null,

    LOGOUT_REQUEST: null,
    LOGOUT_RESPONSE: null
  })

};
