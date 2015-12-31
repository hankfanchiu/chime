var React = require("react");

var Join = React.createClass({
  render: function () {
    var src = "https://s3-us-west-1.amazonaws.com/chime-audio-assets/concert.jpeg";

    return (
      <section className="home-page-join">
        <div className="container">
          <h2 className="home-page-heading">
            Join the community
          </h2>

          <section className="join-message">
            <p>All the music you'll ever need is right here.</p>

            <p>Connect with artists, and discover up-and-coming musicians.</p>

            <p>Explore, add, and save your favorite tunes.</p>
            <p>Create playlists to put the tracks on repeat later.</p>

            <br/>

            <p>Ready to chime in?</p>
          </section>

          <section className="join-button">
            <a className="join-button" onClick={ this.signUp }>
              CREATE ACCOUNT
            </a>
          </section>
        </div>
      </section>
    );
  }
});

module.exports = Join;
