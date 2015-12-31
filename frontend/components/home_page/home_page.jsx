var React = require("react");
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var SessionStore = require("../../stores/session_store");
var Hero = require("./hero");

var HomePage = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { isLoggedIn: SessionStore.isLoggedIn() };
  },

  componentWillMount: function () {
    var isLoggedIn = SessionStore.isLoggedIn();

    if (isLoggedIn) { this.goToDiscover(); }
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.isLoggedIn) { this.goToDiscover(); }
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  goToDiscover: function () {
    this.props.history.pushState(null, "/discover");
  },

  render: function () {
    return (
      <main className="home-page">
        <Hero goToDiscover={ this.goToDiscover } />

        <Grid>
          <Row>
            text here
          </Row>
        </Grid>
      </main>
    );
  }
});

module.exports = HomePage;
