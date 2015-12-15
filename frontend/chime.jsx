var React = require("react");
var ReactDOM = require("react-dom");
var Router = require("react-router").Router;
var Route = require("react-router").Route;
var IndexRoute = require("react-router").IndexRoute;

var App = require("./components/app");
var Explore = require("./components/explore");

var router = (
  <Router>
    <Route path="/" component={ App }>
      <IndexRoute component={ Explore } />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(router, document.getElementById("root"));
});
