var React = require("react");
var SessionStore = require("../../stores/session_store");

var NavSessionLinks = React.createClass({
  getInitialState: function () {
    return { username: SessionStore.getCurrentUserUsername() };
  },

  componentDidMount: function () {
    this.listenerToken = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ username: SessionStore.getCurrentUserUsername() });
  },

  _pushState: function (pathname) {
    this.props.history.pushState(null, pathname);
  },

  render: function () {
    var path = "/" + this.state.username;

    return (
      <ul className="nav navbar-nav nav-links">
        <li>
          <a onClick={ this._pushState.bind(null, path) }>
            <i className="fa fa-user"></i>
          </a>
        </li>

        <li>
          <a onClick={ this._pushState.bind(null, path + "/tracks") }>
            <i className="fa fa-music"></i>
          </a>
        </li>

        <li>
          <a onClick={ this._pushState.bind(null, path + "/playlists") }>
            <i className="fa fa-list"></i>
          </a>
        </li>

        <li>
          <a onClick={ this._pushState.bind(null, "/settings") }>
            <i className="fa fa-cog"></i>
          </a>
        </li>
      </ul>
    );
  }
});

module.exports = NavSessionLinks;
