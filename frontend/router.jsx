var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var createBrowserHistory = require("history/lib/createBrowserHistory");

var App = require("./components/app");
var Home = require("./components/home");
var Discover = require("./components/discover/discover");
var Collect = require("./components/collect/collect");
var SignUp = require("./components/session/sign_up");
var Login = require("./components/session/login");
var Logout = require("./components/session/logout");
var Upload = require("./components/upload/upload");
var Settings = require("./components/session/settings");

var UserPage = require("./components/user/user_page");
var ProfileIndex = require("./components/user/profile/profile_index");
var TracksIndex = require("./components/user/tracks/tracks_index");
var PlaylistsIndex = require("./components/user/playlists/playlists_index");

var TrackPage = require("./components/user/track_page/track_page");
var PlaylistPage = require("./components/user/playlist_page/playlist_page");

module.exports = (
  <Router history={ createBrowserHistory() }>
    <Route name="app" path="/" component={ App }>
      <IndexRoute component={ Home } />
      
      <Route name="discover" path="discover" component={ Discover } />
      <Route name="signup" path="signup" component={ SignUp } />
      <Route name="login" path="login" component={ Login } />
      <Route name="logout" path="logout" component={ Logout } />
      <Route name="upload" path="upload" component={ Upload } />
      <Route name="settings" path="settings" component={ Settings } />

      <Route name="user" path=":username" component={ UserPage }>
        <IndexRoute component={ ProfileIndex } />
        <Route name="tracks" path="tracks" component={ TracksIndex } />
        <Route name="playlists" path="playlists" component={ PlaylistsIndex } />
      </Route>

      <Route name="track" path=":username/:track" component={ TrackPage } />
      <Route name="playlist" path=":username/playlists/:playlist"
        component={ PlaylistPage } />
    </Route>
  </Router>
);
