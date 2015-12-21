var React = require("react");
var UserActions = require("../../actions/user_actions");

var User = React.createClass({
  componentWillMount: function () {
    UserActions.fetchUser(this.props.params.user);
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.params.user !== nextProps.params.user) {
      UserActions.fetchUser(nextProps.params.user);
    }
  },

  _pushState: function (pathname) {
    this.props.history.pushState(null, pathname);
    this.setState({ pathname: pathname });
  },

  renderProfileLink: function () {
    var pathname = "/" + this.props.params.user;

    if (this.props.location.pathname === pathname) {
      return <span>Profile</span>;
    } else {
      return (
        <span>
          <a onClick={ this._pushState.bind(null, pathname) }>
            Profile
          </a>
        </span>
      );
    }
  },

  renderTracksLink: function () {
    var pathname = "/" + this.props.params.user + "/tracks";

    if (this.props.location.pathname === pathname) {
      return <span>Tracks</span>;
    } else {
      return (
        <span>
          <a onClick={ this._pushState.bind(null, pathname) }>
            Tracks
          </a>
        </span>
      );
    }
  },

  renderPlaylistsLink: function () {
    var pathname = "/" + this.props.params.user + "/playlists";

    if (this.props.location.pathname === pathname) {
      return <span>Playlists</span>;
    } else {
      return (
        <span>
          <a onClick={ this._pushState.bind(null, pathname) }>
            Playlists
          </a>
        </span>
      );
    }
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-4">
            User information goes here
          </div>

          <div className="col-xs-8">
            <div className="row">
              <h4>
                { this.renderProfileLink() }

                <span className="spacer spacer-large"></span>

                { this.renderTracksLink() }

                <span className="spacer spacer-large"></span>

                { this.renderPlaylistsLink() }
              </h4>
            </div>

            <div className="row">
              { this.props.children }
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = User;
