var React = require("react");
var ListGroup = require("react-bootstrap").ListGroup;
var ListGroupItem = require("react-bootstrap").ListGroupItem;
var Input = require("react-bootstrap").Input;
var Image = require("react-bootstrap").Image;

module.exports = React.createClass({
  render: function () {
    var track = this.props.track;

    return (
      <Input label="Added Track">
        <ListGroup>
          <ListGroupItem>
            <div className="playlist-form-track">
              <div className="track-thumbnail">
                <Image src={ track.img_thumb } thumbnail />
              </div>

              <section className="track-info">
                <header>
                  <span className="username">
                    { track.user.username }
                  </span>
                </header>

                <header>
                  <span className="title">
                    { track.title }
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
