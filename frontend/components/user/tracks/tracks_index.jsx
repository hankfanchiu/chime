var React = require("react");
var UserStore = require("../../../stores/user_store");
var TracksIndexItem = require("./tracks_index_item");
var UserPageNav = require("../user_page_nav");

var TracksIndex = React.createClass({
  getInitialState: function () {
    return { tracks: UserStore.getTracks() };
  },

  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ tracks: UserStore.getTracks() });
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

        <div className="col-xs-4">
          User information goes here
        </div>

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
