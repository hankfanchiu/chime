var React = require("react");
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var PlayerActions = require("../../../actions/player_actions");

var PlaylistTrack = React.createClass({
  _playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    return (
      <ListGroupItem onClick={ this._playTrack }>
        <Row>
          <Col xs={ 1 } sm={ 1 } md={ 1 }>
            <Image src={ track.img_hero } style={{ width: "30px" }} />
          </Col>

          <Col xs={ 11 } sm={ 11 } md={ 11 }>
            <Row>
              <Col xs={ 1 } sm={ 1 } md={ 1 }>
                { this.props.index }
              </Col>

              <Col xs={ 10 } sm={ 10 } md={ 10 }>
                { track.user.username }<br/>
                { track.title }
              </Col>

              <Col xs={ 1 } sm={ 1 } md={ 1 }>
                <Glyphicon glyph="play" />
              </Col>
            </Row>

          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = PlaylistTrack;
