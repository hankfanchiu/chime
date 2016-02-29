var React = require("react");
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Image = require("react-bootstrap").Image;
var Glyphicon = require("react-bootstrap").Glyphicon;
var PlayerActions = require("../../actions/player_actions");

module.exports = React.createClass({
  playTrack: function () {
    PlayerActions.playTrackNow(this.props.track);
  },

  render: function () {
    var track = this.props.track;

    return (
      <ListGroupItem className="track-list-item" onClick={ this.playTrack }>
        <figure className="track-image">
          <Image src={ track.img_hero } />
        </figure>

        <section className="track-index">
          <span className="track-index">{ this.props.index }</span>
        </section>

        <section className="track-info">
          <span className="username">
            { track.user.username } &mdash;&nbsp;
          </span>

          <span className="title title-thin">{ track.title }</span>
        </section>
      </ListGroupItem>
    );
  }
});
