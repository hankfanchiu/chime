var React = require("react");
var UserActions = require("../../actions/user_actions");

var User = React.createClass({
  getInitialState: function () {
    return { path: this.props.location.pathname };
  },

  componentWillMount: function () {
    UserActions.fetchUser(this.props.params.user);
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.params.user !== nextProps.params.user) {
      UserActions.fetchUser(nextProps.params.user);
    }
  },

  _goToProfile: function () {
    var path = "/" + this.props.params.user;

    this.props.history.pushState(null, path, {});
    this.setState({ path: path });
  },

  _goToTracks: function () {
    var path = "/" + this.props.params.user + "/tracks";

    this.props.history.pushState(null, path, {});
    this.setState({ path: path });
  },

  _goToPlaylists: function () {
    var path = "/" + this.props.params.user + "/playlists";

    this.props.history.pushState(null, path, {});
    this.setState({ path: path });
  },

  renderProfileLink: function () {
    if (this.state.path === "/" + this.props.params.user) {
      return <span>Profile</span>;
    } else {
      return <span><a onClick={ this._goToProfile }>Profile</a></span>;
    }
  },

  renderTracksLink: function () {
    if (this.state.path === "/" + this.props.params.user + "/tracks") {
      return <span>Tracks</span>;
    } else {
      return <span><a onClick={ this._goToTracks }>Tracks</a></span>;
    }
  },

  renderPlaylistsLink: function () {
    if (this.state.path === "/" + this.props.params.user + "/playlists") {
      return <span>Playlists</span>;
    } else {
      return <span><a onClick={ this._goToPlaylists }>Playlists</a></span>;
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
