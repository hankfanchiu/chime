var React = require("react");

var SessionLinks = React.createClass({
  render: function () {
    var path = "/" + this.props.user.username;

    return (
      <ul className="nav navbar-nav">
        <ul className="nav navbar-nav">
        <li>
          <a onClick={ this.props.pushState.bind(null, "/upload") }>
            Upload
          </a>
        </li>
      </ul>

        <li>
          <a onClick={ this.props.pushState.bind(null, path) }>
            <img className="nav-user-avatar"
              src={ this.props.user.avatar_hero } />

            <span className="spacer spacer-small"></span>

            { this.props.user.username }
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

module.exports = SessionLinks;
