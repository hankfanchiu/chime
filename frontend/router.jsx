var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./components/app");
var Home = require("./components/home");
var Discover = require("./components/discover/discover");
var Search = require("./components/search/search");
var SignUp = require("./components/session/sign_up");
var Login = require("./components/session/login");
var Logout = require("./components/session/logout");
var Settings = require("./components/session/settings");

var User = require("./components/user/user");
var UserProfile = require("./components/user/profile/profile_index");
var UserTracks = require("./components/user/tracks/tracks_index");
var UserPlaylists = require("./components/user/playlists/playlists_index");

module.exports = (
  <Router>
    <Route name="app" path="/" component={ App }>
      <IndexRoute component={ Home } />

      <Route name="discover" path="discover" component={ Discover } />
      <Route name="search" path="search" component={ Search } />

      <Route name="signup" path="signup" component={ SignUp } />
      <Route name="login" path="login" component={ Login } />
      <Route name="logout" path="logout" component={ Logout } />

      <Route name="settings" path="settings" component={ Settings } />

      <Route name="user" path=":user" component={ User }>
        <IndexRoute component={ UserProfile } />
        <Route name="user-tracks" path="tracks" component={ UserTracks } />
        <Route name="user-playlists" path="playlists"
          component={ UserPlaylists } />
      </Route>
    </Route>
  </Router>
);
