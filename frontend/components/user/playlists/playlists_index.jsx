var React = require("react");
var UserStore = require("../../../stores/user_store");
var UserPageNav = require("../user_page_nav");
var UserPageSidebar = require("../user_page_sidebar");
var PlaylistsIndexItem = require("./playlists_index_item");

var PlaylistsIndex = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    return {
      user: UserStore.getUser(),
      playlists: UserStore.getPlaylists()
    };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStatesFromStore());
  },

  renderPlaylistsIndexItems: function () {
    if (this.state.playlists.length === 0) {
      return (
        <div className="playlists-index-item clear">
          This user has no playlists! :(
        </div>
      );
    } else {
      return this.state.playlists.map(function (playlist, idx) {
        return <PlaylistsIndexItem key={ idx } playlist={ playlist } />;
      });
    }
  },

  render: function () {
    return (
      <div className="row">

        <UserPageSidebar user={ this.state.user } />

        <div className="col-xs-8">
          <UserPageNav pathname={ this.props.location.pathname }
            history={ this.props.history }
            user={ this.props.params.user } />

          <div className="row">
            <div className="playlists-index clear">
              { this.renderPlaylistsIndexItems() }
            </div>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = PlaylistsIndex;
