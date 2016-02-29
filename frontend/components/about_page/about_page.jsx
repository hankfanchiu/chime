var React = require("react");
var Grid = require("react-bootstrap").Grid;
var PageHeader = require("react-bootstrap").PageHeader;

module.exports = React.createClass({
  render: function () {
    return (
      <main>
        <Grid>
          <PageHeader>Experience amazing</PageHeader>

          <p className="lead">
            Upload your own audio tracks, create playlists, or discover music by other artists. Inspired by SoundCloud, Chime.audio allows uninterrupted music streaming, even through registration, logging in, or logging out.
          </p>

          <p className="lead">
            Currently, Chime is a work-in-progress, with many new features still in the development process. For more information about how and why this site was built, as well as what's coming next, visit Chime's <a href="https://github.com/hankfanchiu/chime">GitHub repository</a>.
          </p>

          <p className="lead">
            For any questions or feedback (always welcomed!), connect with the <a href="http://fanchiu.com">site creator</a> through <a href="https://github.com/hankfanchiu">GitHub</a>, <a href="https://www.linkedin.com/in/hankfanchiu">LinkedIn</a>, or email.
          </p>
        </Grid>
      </main>
    );
  }
});
