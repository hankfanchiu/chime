var React = require("react");
var Col = require("react-bootstrap").Col;
var UserSidebarAvatar = require("./user_sidebar_avatar");

var UserSidebar = React.createClass({
  userTrackCount: function () {
    var tracks = this.props.user.tracks;

    return (tracks ? tracks.length : 0);
  },

  userPlaylistCount: function () {
    var playlists = this.props.user.playlists;

    return (playlists ? playlists.length : 0);
  },

  render: function () {
    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 } className="user-sidebar">
        <UserSidebarAvatar user={ this.props.user }
          client={ this.props.client }
          isClient={ this.props.isClient } />

        <h2>{ this.props.user.username }</h2>

        <section className="user-asset-count">
          <div className="user-asset">
            <h4 className="grey-heading">
              Tracks: { this.userTrackCount() }
            </h4>
          </div>

          <div className="user-asset">
            <h4 className="grey-heading">
              Playlists: { this.userPlaylistCount() }
            </h4>
          </div>
        </section>
      </Col>
    );
  }
});

module.exports = UserSidebar;
