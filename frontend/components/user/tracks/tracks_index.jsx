var React = require("react");
var UserStore = require("../../../stores/user_store");
var UserPageNav = require("../user_page_nav");
var UserPageSidebar = require("../user_page_sidebar");
var TracksIndexItem = require("./tracks_index_item");

var TracksIndex = React.createClass({
  getInitialState: function () {
    return this.getStatesFromStore();
  },

  getStatesFromStore: function () {
    return {
      user: UserStore.getUser(),
      tracks: UserStore.getTracks()
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

  renderTracks: function () {
    var user = this.props.params.user;

    if (this.state.tracks.length === 0) {
      return (
        <div className="tracks-index-item clear">
          This user has no tracks! :(
        </div>
      );
    } else {
      return this.state.tracks.map(function (track) {
        return <TracksIndexItem key={ track.id }
          track={ track } user={ user }/>;
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
            <div className="tracks-index clear">
              { this.renderTracks() }
            </div>
          </div>

        </div>
      </div>
    );
  }
});

module.exports = TracksIndex;
