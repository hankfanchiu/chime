var SessionActions = require("../actions/session_actions");

var WebAPIUtils = {
  signup: function (email, password) {
    var data = {email: email, password: password};

    $.post("/users", {user: data}, function (response) {
      SessionActions.receiveSignUp(response);
    });
  },

  login: function (email, password) {
    var data = {email: email, password: password};

    $.post("/session", {user: data}, function (response) {
      SessionActions.receiveLogin(response);
    });
  },

  logout: function () {
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function (response) {
        SessionActions.receiveLogout(response);
      }
    });
  }
};

module.exports = WebAPIUtils;
