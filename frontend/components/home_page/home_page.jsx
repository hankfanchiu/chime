var React = require("react");
var SessionStore = require("../../stores/session_store");
var DiscoverStore = require("../../stores/discover_store");
var DiscoverActions = require("../../actions/discover_actions");
var Hero = require("./hero");
var Search = require("../search/search");
var RandomTracks = require("./random_tracks");
var Join = require("./join");

module.exports = React.createClass({
  getInitialState: function () {
    return this.getStateFromStore();
  },

  getStateFromStore: function () {
    return {
      tracks: DiscoverStore.all(),
      isLoggedIn: SessionStore.isLoggedIn()
    };
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.discoverListener = DiscoverStore.addListener(this._onChange);

    DiscoverActions.fetchTracks();
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.isLoggedIn) { this.goToDiscover(); }
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
    this.discoverListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function () {
    return (
      <main className="home-page">
        <Hero />

        <section className="home-page-search-container">
          <section className="home-page-search-bar">
            <Search groupClassName="search-group"
              searchResultsName="home-page-search-results"/>
          </section>
        </section>

        <RandomTracks tracks={ this.state.tracks } />
        <Join />
      </main>
    );
  }
});
