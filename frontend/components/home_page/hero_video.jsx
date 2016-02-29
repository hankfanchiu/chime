var React = require("react");

module.exports = React.createClass({
  render: function () {
    var root = "https://s3-us-west-1.amazonaws.com/chime-audio-assets";

    return (
      <section className="video-container">
        <video autoPlay loop preload className="hero">

          <source src={ root + "/video/hero.mp4" } type="video/mp4" />
          <source src={ root + "/video/hero.webm" } type="video/webm" />
          <source src={ root + "/video/hero.ogv" } type="video/ogg" />

          Your browser does not support the <code>video</code> tag.
        </video>
      </section>
    );
  }
});
