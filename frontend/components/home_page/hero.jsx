var React = require("react");

var Hero = React.createClass({
  render: function () {
    var root = "https://s3-us-west-1.amazonaws.com/chime-audio-assets";

    return (
      <section className="hero-module">
        <section className="video-container">
          <video autoPlay loop preload className="hero">

            <source src={ root + "/video/hero.mp4" } type="video/mp4" />
            <source src={ root + "/video/hero.webm" } type="video/webm" />
            <source src={ root + "/video/hero.ogv" } type="video/ogg" />

            Your browser does not support the <code>video</code> tag.
          </video>
        </section>

        <section className="mask">
          <section className="hero-message">
            <h1 className="hero">Musician to Musician</h1>

            <h3 className="hero">
              Listen to tunes by your favorite artists. <br/>
              Share your own and be discovered.
            </h3>

            <div className="hero-button">
              <a className="hero-button" onClick={ this.props.goToDiscover }>
                Start Exploring
              </a>
            </div>
          </section>
        </section>
      </section>
    );
  }
});

module.exports = Hero;
