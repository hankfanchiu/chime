var React = require("react");
var JoinButton = require("./join_button");

var Join = React.createClass({
  render: function () {
    return (
      <section className="home-page-join">
        <div className="container">
          <h2 className="home-page-heading">
            All the music you'll ever need is right here
          </h2>

          <section className="join-message">
            <p>Connect with artists, and discover up-and-coming musicians.</p>
            <p>Explore, add, and save your favorite tunes.</p>
            <p>Create playlists to put the tracks on repeat later.</p>
            <br/>
            <p>Ready to chime in?</p>
          </section>

          <JoinButton name="join-button">
            SIGN UP FOR FREE
          </JoinButton>
        </div>
      </section>
    );
  }
});

module.exports = Join;
