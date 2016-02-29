var React = require("react");
var Link = require("react-router").Link;
var Thumbnail = require("react-bootstrap").Thumbnail;

module.exports = React.createClass({
  render: function () {
    var track = this.props.track;
    var username = track.user.username;

    return (
      <Thumbnail src={ track.img_square } alt={ track.title }>
        <span className="username">
          <Link className="username username-small" to={ "/" + username }>
            { username }
          </Link>
        </span>

        <div className="title-container">
          <span className="title">
            <Link className="title title-small"
              to={ "/" + username + "/" + track.slug }>
              { track.title }
            </Link>
          </span>
        </div>
      </Thumbnail>
    );
  }
});
