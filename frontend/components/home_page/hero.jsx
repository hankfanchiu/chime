var React = require("react");
var HeroVideo = require("./hero_video");
var ExploreButton = require("./explore_button");

var Hero = React.createClass({
  render: function () {
    return (
      <section className="hero-module">
        <HeroVideo />

        <section className="mask">
          <section className="hero-message">
            <h1 className="hero">
              EXPERIENCE AMAZING
            </h1>

            <h3 className="hero">
              Stream music by your favorite artists.<br/>
              Share your own and be discovered.
            </h3>

            <ExploreButton name="hero-button">
              Start Exploring
            </ExploreButton>
          </section>
        </section>
      </section>
    );
  }
});

module.exports = Hero;
