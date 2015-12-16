var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./components/app");
var Index = require("./components/index/index");
var Login = require("./components/session/login");
var SignUp = require("./components/session/sign_up");

module.exports = (
  <Router>
    <Route name="app" path="/" component={ App }>
      <IndexRoute component={ Index } />
      <Route name="login" path="/login" component={ Login } />
      <Route name="signup" path="/signup" component={ SignUp } />
    </Route>
  </Router>
);
