var React = require("react");
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
var Grid = require("react-bootstrap").Grid;
var Row = require("react-bootstrap").Row;
var PageHeader = require("react-bootstrap").PageHeader;
var RandomTrackItem = require("./random_track_item");
var ExploreButton = require("./explore_button");

var RandomTracks = React.createClass({
  _shuffleTracks: function (size) {
    var shuffled = this.props.tracks.slice();
    var idx = shuffled.length;
    var temp, randomIdx;

    while (idx--) {
      randomIdx = Math.floor(Math.random() * (idx + 1));
      temp = shuffled[randomIdx];
      shuffled[randomIdx] = shuffled[idx];
      shuffled[idx] = temp;
    }

    return shuffled.slice(0, size);
  },

  trackRows: function () {
    var tracks = this._shuffleTracks(8);
    var rows = [];
    var row;

    for (var i = 0; i < tracks.length; i += 4) {
      row = (
        <Row key={ i }>
          <RandomTrackItem key={ i } track={ tracks[i] } />
          <RandomTrackItem key={ i + 1 } track={ tracks[i + 1] } />
          <RandomTrackItem key={ i + 2 } track={ tracks[i + 2] } />
          <RandomTrackItem key={ i + 3 } track={ tracks[i + 3] } />
        </Row>
      );

      rows.push(row);
    };

    return rows;
  },

  render: function () {
    var noTracks = (this.props.tracks.length === 0);

    return (
      <Grid className="home-page-hits">
        <h2 className="home-page-heading">Listen to the latest hits</h2>

        <ReactCSSTransitionGroup transitionName="fade"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 300 }>

          { noTracks ? "" : this.trackRows() }
        </ReactCSSTransitionGroup>

        <ExploreButton />
      </Grid>
    );
  }
});

module.exports = RandomTracks;
