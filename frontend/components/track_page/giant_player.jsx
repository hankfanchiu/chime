var React = require("react");
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var PlayerActions = require("../../actions/player_actions");

var GiantPlayer = React.createClass({
  playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    if (!track.user) { return <Row />; }

    return (
      <Row className="giant-player">
        <Col xs={ 1 } sm={ 1 } md={ 1 }>
          <figure className="play-button">
            <span className="btn play-button" onClick={ this.playTrack }>
              <Glyphicon glyph="play" className="play-icon"/>
            </span>
          </figure>
        </Col>

        <Col xs={ 7 } sm={ 7 } md={ 7 }>
          <section className="giant-track-heading">
            <h3 className="giant-username">
              <a onClick={ this.props.goToUser }>
                { track.user.username }
              </a>
            </h3>

            <h1 className="giant-title">
              <span className="giant-title">
                { track.title }
              </span>
            </h1>

            <h5 className="giant-track-time">
              Added { track.time_ago }
            </h5>
          </section>
        </Col>

        <Col xs={ 4 } sm={ 4 } md={ 4 }>
          <Image src={ track.img_square } thumbnail />
        </Col>
      </Row>
    );
  }
});

module.exports = GiantPlayer;
