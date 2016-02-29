var React = require("react");
var Link = require("react-router").Link;
var ExternalLink = require("./external_link");

module.exports = React.createClass({
  render: function () {
    return (
      <footer className="footer">
        <section className="footer-wrapper container">
          <ul className="footer-nav">
            <Link className="logo" to="/">
              Chime
            </Link>
          </ul>

          <ul className="footer-nav">
            <h5>COMPANY</h5>

            <li>
              <Link to="/about">About</Link>
            </li>
            
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

            <ExternalLink name="GitHub"
              href="https://github.com/hankfanchiu/chime" />

            <ExternalLink name="LinkedIn"
              href="https://www.linkedin.com/in/hankfanchiu" />

            <ExternalLink name="Blog"
              href="http://hankfanchiu.tumblr.com/" />
          </ul>
        </section>
      </footer>
    );
  }
});
