var React = require("react");

var NavSessionLinks = React.createClass({
  render: function () {
    var path = "/" + this.props.username;

    return (
      <ul className="nav navbar-nav nav-links">
        <li>
          <a onClick={ this.props.pushState.bind(null, path) }>
            <i className="fa fa-user"></i>
          </a>
        </li>

        <li>
          <a onClick={ this.props.pushState.bind(null, path + "/tracks") }>
            <i className="fa fa-music"></i>
          </a>
        </li>

        <li>
          <a onClick={ this.props.pushState.bind(null, path + "/playlists") }>
            <i className="fa fa-list"></i>
          </a>
        </li>

        <li>
          <a onClick={ this.props.pushState.bind(null, "/settings") }>
            <i className="fa fa-cog"></i>
          </a>
        </li>
      </ul>
    );
  }
});

module.exports = NavSessionLinks;
