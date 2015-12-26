var React = require("react");
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Thumbnail = require("react-bootstrap").Thumbnail;
var PlayerActions = require("../../../actions/player_actions");

var PlaylistTrack = React.createClass({
  _playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    return (
      <ListGroupItem>
        <Row>
          <Col xs={ 2 } sm={ 2 } md={ 2 }>
            <Thumbnail src={ track.img_hero }
              onClick={ this._playTrack } />
          </Col>

          <Col xs={ 10 } sm={ 10 } md={ 10 }>
            <Row>
              <Col xs={ 1 } sm={ 1 } md={ 1 }>
                { this.props.index }
              </Col>

              <Col xs={ 11 } sm={ 11 } md={ 11 }>
                { track.user.username }<br/>
                { track.title }
              </Col>
            </Row>

          </Col>
        </Row>
      </ListGroupItem>
    );
  }
});

module.exports = PlaylistTrack;
