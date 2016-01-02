var React = require("react");
var Col = require("react-bootstrap").Col;
var UserSidebarAvatar = require("./user_sidebar_avatar");

var UserSidebar = React.createClass({
  playlistCount: function () {
    var playlists = this.props.playlists;

    if (!playlists) {
      return 0;
    } else {
      return Object.keys(this.props.playlists).length;
    }
  },

  trackCount: function () {
    var tracks = this.props.tracks;

    if (!tracks) {
      return 0;
    } else {
      return Object.keys(this.props.tracks).length;
    }
  },

  renderNoUser: function () {
    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 } className="user-sidebar">

      </Col>
    );
  },

  render: function () {
    var user = this.props.user;

    if (!user) { return this.renderNoUser(); }

    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 } className="user-sidebar">
        <UserSidebarAvatar user={ user }
          client={ this.props.client }
          isClient={ this.props.isClient } />

        <h2>{ user.username }</h2>

        <section className="user-asset-count">
          <div className="user-asset">
            <h4 className="grey-heading">
              Tracks: { this.trackCount() }
            </h4>
          </div>

          <div className="user-asset">
            <h4 className="grey-heading">
              Playlists: { this.playlistCount() }
            </h4>
          </div>
        </section>

        <section className="user-profile">
          { user.description }
        </section>
      </Col>
    );
  }
});

module.exports = UserSidebar;
