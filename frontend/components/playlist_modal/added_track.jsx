var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Input = require("react-bootstrap").Input;
var Image = require("react-bootstrap").Image;

var AddedTrack = React.createClass({
  render: function () {
    return (
      <Input label="Added Track">
        <ListGroup>
          <ListGroupItem>
            <div className="playlist-form-track">
              <div className="track-thumbnail">
                <Image src={ this.props.track.img_thumb } thumbnail />
              </div>

              <section className="track-info">
                <header>
                  <span className="username">
                    { this.props.track.user.username }
                  </span>
                </header>

                <header>
                  <span className="title">
                    { this.props.track.title }
                  </span>
                </header>
              </section>
            </div>
          </ListGroupItem>
        </ListGroup>
      </Input>
    );
  }
});

module.exports = AddedTrack;
