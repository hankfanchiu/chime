var React = require("react");
var ProfileStore = require("../../../stores/profile_store");
var TracksIndexItem = require("./tracks_index_item");

var TracksIndex = React.createClass({
  getInitialState: function () {
    return { tracks: ProfileStore.getTracks() };
  },

  componentDidMount: function () {
    this.listenerToken = ProfileStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState({ tracks: ProfileStore.getTracks() });
  },

  _goToForm: function () {
    return;
  },

  renderIndexStatus: function () {
    if (this.state.tracks.length === 0) {
      return (
        <h4>
          You have no tracks!&nbsp;
          <a onClick={ this._goToForm }>Chime in to get started.</a>
        </h4>
      );
    } else {
      return (
        <h4>
          <a onClick={ this._goToForm }>
            <i className="fa fa-plus"></i> Add Track
          </a>
        </h4>
      )
    }
  },

  renderTracksIndexItems: function () {
    return this.state.tracks.map(function (track, idx) {
      return <TracksIndexItem key={ idx } track={ track } />;
    });
  },

  render: function () {
    return (
      <div className="tracks-index clear">
        { this.renderIndexStatus() }

        { this.renderTracksIndexItems() }
      </div>
    );
  }
});

module.exports = TracksIndex;
