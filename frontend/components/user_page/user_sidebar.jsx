var React = require("react");
var Col = require("react-bootstrap").Col;
var UserSidebarAvatar = require("./user_sidebar_avatar");
var UserSidebarCount = require("./user_sidebar_count");

module.exports = React.createClass({
  noUser: function () {
    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 } className="user-sidebar" />
    );
  },

  render: function () {
    var user = this.props.user;

    if (!user) { return this.noUser(); }

    return (
      <Col xs={ 3 } sm={ 3 } md={ 3 } className="user-sidebar">
        <UserSidebarAvatar user={ user }
          client={ this.props.client }
          isClient={ this.props.isClient } />

        <section className="user-username">
          <h2>{ user.username }</h2>
        </section>

        <section className="user-asset-count">
          <UserSidebarCount title="Tracks" items={ this.props.tracks } />
          <UserSidebarCount title="Playlists" items={ this.props.playlists } />
        </section>

        <section className="user-profile">
          { user.description }
        </section>
      </Col>
    );
  }
});
