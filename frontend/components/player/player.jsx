var React = require("react");

var Player = React.createClass({
  render: function () {
    return (
      <div className="player">
        <div className="audio">

          <audio preload="auto" controls>
            <source src="/assets/tracks/canon.mp3" />
            <p>
              Your browser does not support the <code>audio</code> element.
            </p>
          </audio>

        </div>
      </div>
    );
  }
});

module.exports = Player;
