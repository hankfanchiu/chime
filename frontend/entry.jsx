var React = require("react");
var ReactDOM = require("react-dom");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;
var IndexRedirect = require("react-router").IndexRedirect;
var createHistory = require("history").createHistory;

var App = require("./components/app");
var HomePage = require("./components/home_page/home_page");
var DiscoverPage = require("./components/discover_page/discover_page");
var Logout = require("./components/session/logout");
var UserPage = require("./components/user_page/user_page");
var TracksIndex = require("./components/user_page/tracks_index");
var PlaylistsIndex = require("./components/user_page/playlists_index");
var TrackPage = require("./components/track_page/track_page");
var PlaylistPage = require("./components/playlist_page/playlist_page");
var SessionStore = require("./stores/session_store");

var preventIfLoggedIn = function (nextState, replaceState) {
  if (SessionStore.isLoggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, "/discover");
  }
};

var requireLogin = function (nextState, replaceState) {
  if (!SessionStore.isLoggedIn()) {
    replaceState({ nextPathname: nextState.location.pathname }, "/discover");
  }
};

var routes = (
  <Router history={ createHistory() }>
    <Route name="app" path="/" component={ App }>
      <IndexRoute component={ HomePage } onEnter={ preventIfLoggedIn }/>
      <Route name="discover" path="discover" component={ DiscoverPage } />
      <Route name="logout"
        path="logout"
        component={ Logout }
        onEnter={ requireLogin } />

      <Route name="user" path=":username" component={ UserPage }>
        <IndexRedirect to="tracks" />
        <Route name="tracks" path="tracks" component={ TracksIndex } />
        <Route name="playlists" path="playlists" component={ PlaylistsIndex } />
      </Route>

      <Route name="track" path=":username/:track" component={ TrackPage } />
      <Route name="playlist"
        path=":username/playlists/:playlist"
        component={ PlaylistPage } />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(routes, document.getElementById('root'));
});
