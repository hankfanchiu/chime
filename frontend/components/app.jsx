var React = require("react");
var SessionActions = require("../actions/session_actions");
var SessionStore = require("../stores/session_store");
var Nav = require("./nav/nav");

var App = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      isLoggedIn: SessionStore.isLoggedIn(),
      email: SessionStore.getEmail()
    };
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <main className="app">
        <Nav isLoggedIn={ this.state.isLoggedIn } email={ this.state.email } />

        <div className="container">
          { this.props.children }
        </div>
      </main>
    );
  }
});

module.exports = App;
