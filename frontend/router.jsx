var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./components/app");
var Home = require("./components/home");
var Discover = require("./components/discover/discover");
var Search = require("./components/search/search");
var Profile = require("./components/profile/profile");
var TracksIndex = require("./components/profile/tracks/tracks_index");
var PlaylistsIndex = require("./components/profile/playlists/playlists_index");
var Settings = require("./components/profile/settings");
var Login = require("./components/session/login");
var SignUp = require("./components/session/sign_up");

module.exports = (
  <Router>
    <Route name="app" path="/" component={ App }>
      <IndexRoute component={ Home } />

      <Route name="discover" path="/discover" component={ Discover } />
      <Route name="search" path="/search" component={ Search } />

      <Route name="profile" path="/profile" component={ Profile }>
        <Route name="tracks" path="/tracks" component={ TracksIndex } />
        <Route name="playlists" path="/playlists"
          component={ PlaylistsIndex } />
      </Route>

      <Route name="settings" path="/settings" component={ Settings } />

      <Route name="login" path="/login" component={ Login } />
      <Route name="signup" path="/signup" component={ SignUp } />
    </Route>
  </Router>
);
