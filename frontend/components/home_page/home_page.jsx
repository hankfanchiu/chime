var React = require("react");
var Search = require("./search");

var HomePage = React.createClass({
  goToDiscover: function () {
    this.props.history.pushState(null, "/discover");
  },

  render: function () {
    var root = "https://s3-us-west-1.amazonaws.com/chime-audio-assets";

    return (
      <div className="home">
        <section className="hero-module">
          <div className="mask" />

          <section className="video-container">
            <video autoPlay loop preload className="hero">

              <source src={ root + "/video/hero.mp4" } type="video/mp4" />
              <source src={ root + "/video/hero.webm" } type="video/webm" />
              <source src={ root + "/video/hero.ogv" } type="video/ogg" />

              Your browser does not support the <code>video</code> tag.
            </video>
          </section>

          <section className="hero-message">
            <h1 className="hero">Let's chime in.</h1>

            <h3 className="hero">
              Listen to tunes by your favorite artists.
            </h3>

            <h3 className="hero">
              Share your own and be discovered.
            </h3>

            <span className="hero-button" onClick={ this.goToDiscover }>
              Get Started
            </span>
          </section>

          <Search />
        </section>


      </div>
    );
  }
});

module.exports = HomePage;
