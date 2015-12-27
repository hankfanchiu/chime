var React = require("react");
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
var PageHeader = require("react-bootstrap").PageHeader;
var DiscoverStore = require("../../stores/discover_store");
var DiscoverActions = require("../../actions/discover_actions");
var DiscoverTrack = require("./discover_track");

var Discover = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return { tracks: DiscoverStore.all() };
  },

  componentWillMount: function () {
    DiscoverActions.fetchTracks();
  },

  componentDidMount: function () {
    this.listenerToken = DiscoverStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  renderDiscoverRows: function () {
    var tracks = this.state.tracks;
    var rows = [];
    var row;

    for (var i = 0; i < tracks.length; i += 4) {
      row = (
        <Row key={ i }>
          <DiscoverTrack key={ i } track={ tracks[i] } />
          <DiscoverTrack key={ i + 1 } track={ tracks[i + 1] } />
          <DiscoverTrack key={ i + 2 } track={ tracks[i + 2] } />
          <DiscoverTrack key={ i + 3 } track={ tracks[i + 3] } />
        </Row>
      );

      rows.push(row);
    };

    return rows;
  },

  render: function () {
    return (
      <Grid>
        <PageHeader>
          Discover new chimes
          
          <p>
            <small>See what's popular. Play it now or add to your own playlist.</small>
          </p>
        </PageHeader>

        { this.renderDiscoverRows() }
      </Grid>
    );
  }
});

module.exports = Discover;
