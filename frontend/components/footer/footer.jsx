var React = require("react");
var History = require("react-router").History;

var Footer = React.createClass({
  mixins: [History],

  goToHome: function () {
    this.history.pushState(null, "/");
  },

  render: function () {
    var src = "https://s3-us-west-1.amazonaws.com/chime-audio-assets/logo.png";

    return (
      <footer className="footer">
        <section className="footer-wrapper container">
          <ul className="footer-nav">
            <a className="logo" onClick={ this.goToHome }>Chime</a>
          </ul>

          <ul className="footer-nav">
            <h5>COMPANY</h5>
            <li><a>About</a></li>
            <li><a>Careers</a></li>
            <li><a>Press</a></li>
          </ul>

          <ul className="footer-nav">
            <h5>COMMUNITIES</h5>
            <li><a>Artists</a></li>
            <li><a>Labels</a></li>
            <li><a>Developers</a></li>
          </ul>

          <ul className="footer-nav">
            <h5>CONNECT</h5>
            <li>
              <a target="_blank" href="https://github.com/hankfanchiu/chime">
                GitHub
              </a>
            </li>

            <li>
              <a target="_blank" href="https://www.linkedin.com/in/hankfanchiu">
                LinkedIn
              </a>
            </li>

            <li>
              <a target="_blank" href="http://hankfanchiu.tumblr.com/">
                Blog
              </a>
            </li>
          </ul>
        </section>
      </footer>
    );
  }
});

module.exports = Footer;
